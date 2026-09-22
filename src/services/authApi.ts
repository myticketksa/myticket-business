import { z } from 'zod'
import { api } from '@/services/api'

const loginResponseSchema = z.object({
  data: z.object({
    user: z.object({
      id: z.union([z.string(), z.number()]),
      name: z.string().nullable().optional(),
      email: z.string().nullable().optional(),
      phone: z.string().nullable().optional(),
      role: z.string(),
    }),
    access_token: z.string(),
  }),
})

export interface LoginRequest {
  identifier: string
  password: string
}

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<z.infer<typeof loginResponseSchema>['data'], LoginRequest>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
      transformResponse: (response) => loginResponseSchema.parse(response).data,
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
    forgotPassword: build.mutation<void, { email: string }>({
      query: (body) => ({
        url: '/auth/login/password/forgot',
        method: 'POST',
        body,
      }),
    }),
    resetPassword: build.mutation<
      void,
      { email: string; code: string; password: string; password_confirmation: string }
    >({
      query: (body) => ({
        url: '/auth/login/password/reset',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useLoginMutation, useLogoutMutation, useForgotPasswordMutation, useResetPasswordMutation } =
  authApi
