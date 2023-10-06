import { Platform } from 'react-native'
import PushNotification from 'react-native-push-notification'
import { NOTIFICATION_CHANNEL_ID } from '@utils/constants/notification'

export const configPushNotification: () => void = () => {
   PushNotification.configure({
      onRegister: function (token) {
         console.log('TOKEN:', token)
      },
      onNotification: function (notification) {
         notification.finish('test-notification')
      },
      onRegistrationError: function (err) {
         console.error(err.message)
      },
      permissions: {
         alert: true, 
         badge: true, 
         sound: false
      }, 
      popInitialNotification: true, 
      requestPermissions: Platform.OS === 'ios'
   })

   PushNotification.createChannel({
      channelId: NOTIFICATION_CHANNEL_ID,
      channelName: 'LIFECARE-CHANNEL', 
      playSound: false, 
      soundName: 'default',
      vibrate: true
   }, created => console.log(`created channel ${created}`))

   PushNotification.localNotification({
      channelId: NOTIFICATION_CHANNEL_ID,
      title: 'MESSAGE_TITLE',
      message: 'Test notification message',
      allowWhileIdle: true, 
      playSound: true, 
      soundName: 'default'
   })
}