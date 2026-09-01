import { object, string } from "yup"

export const publicProfileSchema = object({
  displayName: string().trim().required("Enter a display name"),
  type: string().oneOf(["company", "individual"]).required(),
  biography: string()
    .trim()
    .required("Enter a biography")
    .max(600, "Biography must be 600 characters or fewer"),
  contactEmail: string().trim().email("Enter a valid email").required("Enter a contact email"),
  phone: string().trim().required("Enter a phone number"),
  region: string().trim().required("Choose a region"),
  city: string().trim().required("Choose a city"),
})

export type PublicProfileValues = {
  displayName: string
  type: "company" | "individual"
  biography: string
  contactEmail: string
  phone: string
  region: string
  city: string
}
