import { z } from 'zod'

export function buildLoginSchema(t: (key: string) => string) {
  return z.object({
    identifier: z.string().min(1, t('auth.identifierRequired')),
    password: z.string().min(1, t('auth.passwordRequired')),
  })
}

export type LoginFormValues = z.infer<ReturnType<typeof buildLoginSchema>>
