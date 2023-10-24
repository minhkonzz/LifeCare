import { combineReducers, configureStore } from '@reduxjs/toolkit'
import appReducer from './app'
import authReducer from './auth'
import networkReducer from './network'

const store = configureStore({
   reducer: {
      app: appReducer, 
      auth: authReducer,
      network: networkReducer
   }
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store