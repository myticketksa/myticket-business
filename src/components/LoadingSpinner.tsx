import * as LottieModule from 'lottie-react'
import loadingAnimation from '@/assets/loading.json'

// Vite's dev-time dependency pre-bundling mis-detects this package's UMD
// build and wraps the whole CJS exports object as the default export
// instead of unwrapping it, so `import Lottie from 'lottie-react'` gives a
// plain object (not a component) and React throws "Element type is
// invalid". Unwrap it manually regardless of which shape comes through.
type LottieComponent = (typeof LottieModule)['default']
const rawDefault = LottieModule.default as unknown as LottieComponent | { default: LottieComponent }
const Lottie: LottieComponent =
  typeof rawDefault === 'function' ? rawDefault : rawDefault.default

export default function LoadingSpinner({ size = 160 }: { size?: number }) {
  return (
    <div className="flex items-center justify-center py-8">
      <Lottie animationData={loadingAnimation} loop style={{ height: size, width: size }} />
    </div>
  )
}
