import { object, string } from "yup"

export const signInSchema = object({
  identifier: string().trim().required("Enter your email or phone number"),
  password: string().required("Enter your password"),
})

export type SignInValues = {
  identifier: string
  password: string
}
