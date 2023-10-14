import { useEffect } from 'react'
import { Platform, PermissionsAndroid } from 'react-native'
// import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context' 
// import Stack from '@navigations/stack'
import Reminder from '@screens/reminder'
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
         <Reminder />
	   	{/* <NavigationContainer>
            <Stack />
         </NavigationContainer> */}
		</SafeAreaProvider>
   )
}


