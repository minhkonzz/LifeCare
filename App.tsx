import { useEffect } from 'react'
import { Platform, PermissionsAndroid } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context' 
import TestPopup from '@screens/test-popup'
import { configPushNotification } from './src/configs/push-notification'

configPushNotification()

export default (): JSX.Element => {
   const requestNotificationPermission = async() => {
      if (Platform.OS !== 'android') return
      try {
         await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)
      } catch (err) {
         console.error(err)
      }
   }

   useEffect(() => {
      requestNotificationPermission()
   }, [])

   return (
      <SafeAreaProvider>
	   	<TestPopup />
		</SafeAreaProvider>
   )
}


