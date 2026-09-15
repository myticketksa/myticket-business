import { z } from 'zod'

const STORAGE_KEY = 'myticket_admin_session'

const userSchema = z.object({
  id: z.union([z.string(), z.number()]),
  name: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  role: z.string(),
})

const sessionSchema = z.object({
  user: userSchema,
  accessToken: z.string(),
})

export type AdminUser = z.infer<typeof userSchema>
export type AdminSession = z.infer<typeof sessionSchema>

export function loadSession(): AdminSession | null {
  const raw = sessionStorage.getItem(STORAGE_KEY)
  if (!raw) return null

  const parsed = sessionSchema.safeParse(JSON.parse(raw))
  if (!parsed.success) {
    sessionStorage.removeItem(STORAGE_KEY)
    return null
  }
  return parsed.data
}

export function saveSession(session: AdminSession): void {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session))
}

export function clearSession(): void {
  sessionStorage.removeItem(STORAGE_KEY)
}
