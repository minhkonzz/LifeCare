import { configureStore } from '@reduxjs/toolkit'
import appReducer from './app-slice'
import authReducer from './auth-slice'

const store = configureStore({
   reducer: {
      app: appReducer, 
      auth: authReducer
   }
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store