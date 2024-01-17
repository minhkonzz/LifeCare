import { Platform } from 'react-native'
import { NOTIFICATION_CHANNEL_ID } from '@utils/constants/notification'
import { calculateAmountBetweenTimes } from '@utils/datetimes'
import { WATER_REMIND, START_FAST_REMIND, END_FAST_REMIND, WEIGHT_REMIND } from '@utils/constants/notification'
import PushNotification from 'react-native-push-notification'

export const configPushStartFastNotification = (bundledConfig: any) => {
   const { startFast, beforeStartFast } = bundledConfig

   const startFastDate = new Date(startFast)
   const hourStartFast = startFastDate.getHours()
   const minStartFast = startFastDate.getMinutes()
   const hourRemind = hourStartFast
   const minRemind = minStartFast - beforeStartFast
   
   const d = new Date()
   const currentHour = d.getHours()
   const currentMin = d.getMinutes()

   const totalMiliseconds = calculateAmountBetweenTimes({
      startTime: `${currentHour}:${currentMin}`,
      endTime: `${hourRemind}:${minRemind}`
   })
   
   PushNotification.localNotificationSchedule({
      channelId: NOTIFICATION_CHANNEL_ID,
      date: new Date(Date.now() + totalMiliseconds),
      title: "Get ready for the next fasting phase",
      message: `You'll in fasting period after ${beforeStartFast} minutes`,
      allowWhileIdle: true, 
      playSound: true, 
      soundName: 'default',
      userInfo: { type: START_FAST_REMIND }
   })
}

export const configPushEndFastNotification = (bundledConfig: any) => {
   const { endFast, beforeEndFast } = bundledConfig

   const endFastDate = new Date(endFast)
   const hourEndFast = endFastDate.getHours()
   const minEndFast = endFastDate.getMinutes()

   const { hourRemind, minRemind } = minEndFast < beforeEndFast && 
   {
      hourRemind: hourEndFast - 1,
      minRemind: 60 - Math.abs(minEndFast - beforeEndFast)
   } ||
   {
      hourRemind: hourEndFast,
      minRemind: minEndFast - beforeEndFast
   }

   const d = new Date()
   const currentHour = d.getHours()
   const currentMin = d.getMinutes()

   const totalMsUntilPush = calculateAmountBetweenTimes({
      startTime: `${currentHour}:${currentMin}`,
      endTime: `${hourRemind}:${minRemind}`
   })
   
   PushNotification.localNotificationSchedule({
      channelId: NOTIFICATION_CHANNEL_ID,
      date: new Date(Date.now() + totalMsUntilPush),
      title: "Eating time is coming",
      message: `You'll in eating period after ${beforeEndFast} minutes`,
      allowWhileIdle: true, 
      playSound: true, 
      soundName: 'default',
      userInfo: { type: END_FAST_REMIND }
   })
}

export const configPushWeightNotification = (bundledConfig: any) => {
   const { repeatWeight, currentWeight } = bundledConfig
}

export const configPushWaterDrinkNotification = (bundledConfig: any) => {
   const {
      startWater,
      endWater,
      waterInterval,
      drinked
   } = bundledConfig

   const { h: startHour, m: startMin } = startWater
   const { h: endHour, m: endMin } = endWater
   const currentDate = new Date()
   const currentHour = currentDate.getHours()
   const shouldSendNotification = (currentHour >= startHour && currentHour < endHour) || (currentHour > startHour && currentHour <= endHour)

   const { h: hourInterval, m: minInterval } = waterInterval
   const totalIntervalMs: number = hourInterval * 3600000 + minInterval * 60000

   const currentMin = currentDate.getMinutes()
   const totalMsUntilEndOfDay: number = calculateAmountBetweenTimes({
      startTime: `${currentHour}:${currentMin}`,
      endTime: `${endHour}:${endMin}`
   })

   const totalMsUntilPush: number = shouldSendNotification && totalIntervalMs < totalMsUntilEndOfDay && totalIntervalMs || calculateAmountBetweenTimes({
      startTime: `${currentHour}:${currentMin}`,
      endTime: `${startHour}:${startMin}`
   })

   PushNotification.cancelLocalNotification(`WATER${WATER_REMIND}`)

   PushNotification.localNotificationSchedule({
      channelId: NOTIFICATION_CHANNEL_ID,
      id: `WATER${WATER_REMIND}`,
      date: new Date(Date.now() + totalMsUntilPush),
      title: 'Remember to keep track your water',
      message: `Time to drink more water. You drinked ${drinked} ml today`,
      allowWhileIdle: true, 
      playSound: true, 
      soundName: 'default',
      userInfo: { type: WATER_REMIND }
   })
}

export const configPushNotification = (bundledConfig: any) => {
   
   const { 
      startWater,
      endWater, 
      waterInterval, 
      drinked
   } = bundledConfig

   PushNotification.configure({
      onRegister: function (token) {},

      onNotification: function (notification) {
         const { data } = notification
         const notificationType = data.type
         switch (notificationType) {
            case START_FAST_REMIND: {
               
               return
            }
            case END_FAST_REMIND: {  
               return
            }
            case WATER_REMIND: {
               configPushWaterDrinkNotification({ startWater, endWater, waterInterval, drinked })
               return
            }
         }
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
}