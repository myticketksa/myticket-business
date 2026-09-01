import { toast } from "sonner"

export function notifySuccess(title: string, subtitle?: string): void {
  toast.success(title, { description: subtitle })
}

export function notifyError(title: string, subtitle?: string): void {
  toast.error(title, { description: subtitle })
}

export function notifyNeutral(title: string, subtitle?: string): void {
  toast(title, { description: subtitle })
}
