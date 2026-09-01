import { boolean, object, string } from "yup"

export const eventEditorSchema = object({
  title: string().trim().required("Enter a title"),
  shortSummary: string().trim().default(""),
  description: string().trim().default(""),
  category: string().trim().default(""),
  promoVideo: string().trim().default(""),
  starts: string().trim().default(""),
  ends: string().trim().default(""),
  repetition: string().trim().default("one-time"),
  scanning: string().trim().default("single"),
  entryInstructions: string().trim().default(""),
  refunds: string().trim().default("cutoff"),
  platformFeeRefundable: boolean().default(false),
})

export type EventEditorValues = {
  title: string
  shortSummary: string
  description: string
  category: string
  promoVideo: string
  starts: string
  ends: string
  repetition: string
  scanning: string
  entryInstructions: string
  refunds: string
  platformFeeRefundable: boolean
}
