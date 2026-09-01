import { ShellCanvas } from "@/app/dev/ShellCanvas"
import { VendorGalleryPage } from "@/features/vendor/VendorGalleryPage"
import { useAppSelector } from "@/store/hooks"

export function GalleryRoute() {
  const role = useAppSelector((state) => state.auth.user?.role)

  if (role === "vendor") {
    return <VendorGalleryPage />
  }

  return <ShellCanvas />
}
