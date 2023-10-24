import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './user'
import authReducer from './auth'
import networkReducer from './network'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { 
   persistReducer,
   FLUSH,
   REHYDRATE,
   PAUSE,
   PERSIST,
   PURGE,
   REGISTER
 } from 'redux-persist'

const persistConfig = {
   key: 'root', 
   storage: AsyncStorage,
   whitelist: ['user'], 
   blacklist: ['auth', 'network']
}

const rootReducer = combineReducers({
   user: userReducer, 
   auth: authReducer, 
   network: networkReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({ 
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: {
         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      }
   })
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store