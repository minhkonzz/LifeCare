import { useEffect } from 'react'
import { Platform, PermissionsAndroid, Alert } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context' 
import { configPushNotification } from './src/configs/push-notification'
import { Provider } from 'react-redux'
import store from './src/store'
import RootNavigator from '@navigations/root'

// configPushNotification()

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
         <SafeAreaProvider>
            <RootNavigator />
         </SafeAreaProvider>
      </Provider>
   )
}