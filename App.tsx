import { useEffect } from 'react'
import { Platform, PermissionsAndroid, Alert } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context' 
import { configPushNotification } from './src/configs/push-notification'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import store from './src/store'
import RootNavigator from '@navigations/root'

// configPushNotification()
const persistor = persistStore(store)

export default (): JSX.Element => {
   // const requestNotificationPermission = async() => {
   //    if (Platform.OS !== 'android') return
   //    try {
   //       await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)
   //    } catch (err) {
   //       console.error(err)
   //    }
   // }

   useEffect(() => {
      // requestNotificationPermission()
   }, [])

   return (
      <Provider {...{ store }}>
         <PersistGate {...{ persistor }}>
            <SafeAreaProvider>
               <RootNavigator />
            </SafeAreaProvider>
         </PersistGate>
      </Provider>
   )
}