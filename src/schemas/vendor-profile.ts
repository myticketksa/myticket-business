import { object, string } from "yup"

export const vendorProfileSchema = object({
  businessName: string().trim().required("Enter a business name"),
  contactEmail: string()
    .trim()
    .required("Enter a contact email")
    .email("Enter a valid email"),
  biography: string()
    .trim()
    .required("Enter a biography")
    .max(600, "Biography must be 600 characters or fewer"),
  region: string().trim().required("Choose a region"),
  city: string().trim().required("Choose a city"),
  coverage: string().trim().required("Choose a coverage area"),
})

export type VendorProfileValues = {
  businessName: string
  contactEmail: string
  biography: string
  region: string
  city: string
  coverage: string
}
