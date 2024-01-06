import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './user'
import authReducer from './auth'
import networkReducer from './network'
import surveyReducer from './survey'
import fastingReducer from './fasting'
import waterReducer from './water'
import settingReducer from './setting'
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
   // transforms: [aesEncryptDecryptTransformer],
   whitelist: ['user', 'fasting', 'setting', 'water'], 
   blacklist: ['auth', 'network', 'survey']
}

const rootReducer = combineReducers({
   user: userReducer, 
   auth: authReducer, 
   network: networkReducer, 
   survey: surveyReducer, 
   fasting: fastingReducer,
   setting: settingReducer,
   water: waterReducer
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

export type AppStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store