import { configureStore, createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit'
import authReducer, { loggedOut, sessionEstablished } from '@/features/auth/authSlice'
import { api } from '@/services/api'

// Everything fetched is cached per page, not per account — so after logging
// out and in as a different organizer, their events, stats and cashiers kept
// showing the previous account's data until a refresh. Drop the whole cache
// whenever the signed-in account changes.
const accountChange = createListenerMiddleware()
accountChange.startListening({
  matcher: isAnyOf(loggedOut, sessionEstablished),
  effect: (_action, listenerApi) => {
    listenerApi.dispatch(api.util.resetApiState())
  },
})

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(accountChange.middleware).concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
