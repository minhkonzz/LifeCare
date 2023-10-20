import { useEffect } from 'react'
import { Platform, PermissionsAndroid, Alert } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context' 
// import { UserContextProvider } from './src/contexts/user'
import BottomTabs from '@navigations/bottom-tabs'
import Auth from '@screens/auth'
import { configPushNotification } from './src/configs/push-notification'
import { Provider } from 'react-redux'
import store from './src/store'

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

   // useEffect(() => {
   //    requestNotificationPermission()
   // }, [])

   return (
      <SafeAreaProvider>
         <Provider {...{ store }}>
            <Auth />
         </Provider>
         {/* <NavigationContainer>
            <UserContextProvider>
               <BottomTabs />
            </UserContextProvider>
         </NavigationContainer> */}
      </SafeAreaProvider>
   )
}