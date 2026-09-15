export interface Cashier {
  id: number
  name: string | null
  email: string | null
  phone: string | null
  role: string
  emailVerified: boolean
  walletBalance: string | number
  created_at: string
}
