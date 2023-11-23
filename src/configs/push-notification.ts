import { Platform } from 'react-native'
import PushNotification from 'react-native-push-notification'
import { NOTIFICATION_CHANNEL_ID } from '@utils/constants/notification'
import BackgroundTimer from 'react-native-background-timer'

export const configPushFastingNotification = (bundledConfig: any) => {
   const { reminders, startFast, endFast } = bundledConfig
}

export const configPushWeightNotification = (bundledConfig: any) => {
   const { reminders, currentWeight } = bundledConfig
}

export const configPushWaterDrinkNotification = (bundledConfig: any) => {
   const { reminders, drinked } = bundledConfig

   const shouldSendWaterDrinkNotification = () => {
      const { h: startHour } = reminders.startWater
      const { h: endHour } = reminders.endWater
      const currentDate = new Date()
      const currentHour = currentDate.getHours()
      return (currentHour >= startHour && currentHour < endHour) || (currentHour > startHour && currentHour <= endHour)
   }

   const { h: hourInterval, m: minInterval } = reminders.waterInterval
   const totalSeconds = hourInterval * 3600 + minInterval * 60
   BackgroundTimer.setInterval(() => {
      if (shouldSendWaterDrinkNotification()) {
         PushNotification.localNotification({
            channelId: NOTIFICATION_CHANNEL_ID,
            title: 'Remember to keep track your water',
            message: `Time to drink more water. You drinked ${drinked} ml today`,
            allowWhileIdle: true, 
            playSound: true, 
            soundName: 'default'
         })
      }
   }, totalSeconds)
}

export const configPushNotification = (bundledConfig: any) => {
   
   const { 
      reminders,
      startFast, 
      endFast,
      drinked, 
      currentWeight
   } = bundledConfig

   PushNotification.configure({
      onRegister: function (token) {},

      onNotification: function (notification) {},

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

   configPushWaterDrinkNotification({ reminders, drinked })
   configPushFastingNotification({ reminders, startFast, endFast })
   configPushWeightNotification({ reminders, currentWeight })
}