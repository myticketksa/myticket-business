/**
 * Shrinks images in the browser before they're uploaded.
 *
 * The web server in front of the API refuses any request over 1 MB — nginx's
 * default, measured at exactly 1,048,576 bytes — and it refuses it before
 * Laravel sees it, so the request fails with a bare 413 and no explanation.
 * A photo straight off a phone is several times that on its own.
 *
 * Rather than making the organizer resize things by hand, every picture they
 * choose is re-drawn to a sane size and re-encoded before it's sent. A 4 MB
 * photo comes out around 300 KB with no visible difference at the sizes the
 * app displays.
 */

const TARGET_BYTES = 400_000
const MAX_EDGE = 1920
const QUALITY_STEPS = [0.85, 0.75, 0.65, 0.55]

/** Formats that survive a canvas round-trip. GIFs are left alone — re-encoding
 *  one throws away the animation — and so is anything that isn't an image. */
const SHRINKABLE = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

function canShrink(file: File) {
  return SHRINKABLE.includes(file.type.toLowerCase())
}

function scaledSize(width: number, height: number) {
  const longestEdge = Math.max(width, height)
  if (longestEdge <= MAX_EDGE) return { width, height }
  const ratio = MAX_EDGE / longestEdge
  return { width: Math.round(width * ratio), height: Math.round(height * ratio) }
}

function toBlob(canvas: HTMLCanvasElement, quality: number): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', quality))
}

/**
 * Returns a smaller version of the file, or the file itself when it's already
 * small enough, isn't an image, or can't be re-encoded for any reason. It
 * never throws: a failure here should cost the upload nothing.
 */
export async function shrinkImage(file: File): Promise<File>
export async function shrinkImage(file: File | undefined | null): Promise<File | undefined>
export async function shrinkImage(file: File | undefined | null): Promise<File | undefined> {
  if (!file) return undefined
  if (!canShrink(file) || file.size <= TARGET_BYTES) return file

  try {
    // Honour the EXIF rotation a phone camera writes, or portrait photos come
    // back on their side once they've been through the canvas.
    const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' })
    const { width, height } = scaledSize(bitmap.width, bitmap.height)

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const context = canvas.getContext('2d')
    if (!context) return file
    context.drawImage(bitmap, 0, 0, width, height)
    bitmap.close()

    // Drop quality a step at a time until it fits, and keep the smallest
    // attempt even if nothing gets under the budget — smaller is still better
    // than the original.
    let best: Blob | null = null
    for (const quality of QUALITY_STEPS) {
      const blob = await toBlob(canvas, quality)
      if (!blob) continue
      if (!best || blob.size < best.size) best = blob
      if (blob.size <= TARGET_BYTES) break
    }

    if (!best || best.size >= file.size) return file

    const name = file.name.replace(/\.[^.]+$/, '') + '.jpg'
    return new File([best], name, { type: 'image/jpeg', lastModified: Date.now() })
  } catch {
    return file
  }
}

export async function shrinkImages(files: File[]): Promise<File[]> {
  return Promise.all(files.map((file) => shrinkImage(file)))
}
