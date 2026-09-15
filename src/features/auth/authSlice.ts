import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AdminSession, AdminUser } from '@/lib/authSession'
import { clearSession, loadSession, saveSession } from '@/lib/authSession'

const initialSession = loadSession()

interface AuthState {
  user: AdminUser | null
  accessToken: string | null
}

const initialState: AuthState = {
  user: initialSession?.user ?? null,
  accessToken: initialSession?.accessToken ?? null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    sessionEstablished: (state, action: PayloadAction<AdminSession>) => {
      state.user = action.payload.user
      state.accessToken = action.payload.accessToken
      saveSession(action.payload)
    },
    loggedOut: (state) => {
      state.user = null
      state.accessToken = null
      clearSession()
    },
  },
})

export const { sessionEstablished, loggedOut } = authSlice.actions
export default authSlice.reducer
