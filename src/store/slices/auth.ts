import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { AuthUser } from "@/types/user"

export interface AuthState {
  user: AuthUser | null
}

const initialState: AuthState = {
  user: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload
    },
    signOut(state) {
      state.user = null
    },
  },
})

export const { setUser, signOut } = authSlice.actions
export const authReducer = authSlice.reducer
