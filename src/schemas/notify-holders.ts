import { boolean, object, string } from "yup"

export const notifyKinds = [
  "schedule",
  "venue",
  "announcement",
  "cancellation",
] as const

export type NotifyKind = (typeof notifyKinds)[number]

export const notifyHoldersSchema = object({
  kind: string().oneOf([...notifyKinds]).required(),
  message: string().trim().required("Enter a message").max(500),
  push: boolean().default(true),
  email: boolean().default(true),
  sms: boolean().default(false),
})

export type NotifyHoldersValues = {
  kind: NotifyKind
  message: string
  push: boolean
  email: boolean
  sms: boolean
}
