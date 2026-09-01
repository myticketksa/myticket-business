import { object, string } from "yup"

export const supportCaseSchema = object({
  topic: string().trim().required("Choose what the case is about"),
  related: string().trim(),
  description: string().trim().required("Describe what happened"),
})

export type SupportCaseValues = {
  topic: string
  related: string
  description: string
}
