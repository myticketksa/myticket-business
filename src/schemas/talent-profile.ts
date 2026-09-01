import { object, string } from "yup"

export const talentProfileSchema = object({
  stageName: string().trim().required("Enter a stage name"),
  biography: string()
    .trim()
    .required("Enter a biography")
    .max(600, "Biography must be 600 characters or fewer"),
  region: string().trim().required("Choose a region"),
  city: string().trim().required("Choose a city"),
})

export type TalentProfileValues = {
  stageName: string
  biography: string
  region: string
  city: string
  travels: boolean
  showCity: boolean
}
