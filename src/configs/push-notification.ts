import { Platform } from 'react-native'
import PushNotification from 'react-native-push-notification'
import { NOTIFICATION_CHANNEL_ID } from '@utils/constants/notification'
import BackgroundTimer from 'react-native-background-timer'

/*
   function calculateTimeDifference(startTime, endTime) {
   var startDate = new Date("2000-01-01 " + startTime);
   var endDate = new Date("2000-01-02 " + endTime); // Thêm một ngày để đảm bảo endTime nằm sau startTime

   // Kiểm tra nếu endTime nhỏ hơn startTime, tăng thêm một ngày cho endDate
   if (endDate < startDate) {
      endDate.setDate(endDate.getDate() + 1);
   }

   var timeDiff = endDate - startDate;

   var hours = Math.floor(timeDiff / (1000 * 60 * 60));
   var minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

   return {
      hours: hours,
      minutes: minutes
   };
   }

   // Sử dụng hàm calculateTimeDifference
   var startTime = "22:13";
   var endTime = "01:45";

   var timeDiff = calculateTimeDifference(startTime, endTime);
   console.log(timeDiff.hours + " giờ " + timeDiff.minutes + " phút");
*/

export const configPushStartFastNotification = (bundledConfig: any) => {
   const {
      startFast, 
      beforeStartFast
   } = bundledConfig

   const startFastDate = new Date(startFast)
   const hourStartFast = startFastDate.getHours()
   const minStartFast = startFastDate.getMinutes()
   const hourRemind = hourStartFast
   const minRemind = minStartFast - beforeStartFast
   
   const d = new Date()
   const currentHour = d.getHours()
   const currentMin = d.getMinutes()

   // have total miliseconds
   const totalMiliseconds = 100000

   BackgroundTimer.setTimeout(() => {
      PushNotification.localNotification({})
      configPushStartFastNotification({ startFast, beforeStartFast })
   }, totalMiliseconds)
}

export const configPushEndFastNotification = (bundledConfig: any) => {
   const {
      endFast, 
      beforeEndFast
   } = bundledConfig

   const endFastDate = new Date(endFast)
   const hourEndFast = endFastDate.getHours()
   const minEndFast = endFastDate.getMinutes()
   const hourRemind = hourEndFast
   const minRemind = minEndFast - beforeEndFast

   const d = new Date()
   const currentHour = d.getHours()
   const currentMin = d.getMinutes()

   // have total miliseconds
   const totalMiliseconds = 100000

   BackgroundTimer.setTimeout(() => {
      PushNotification.localNotification({})
      configPushStartFastNotification({ endFast, beforeEndFast })
   }, totalMiliseconds)
}

export const configPushWeightNotification = (bundledConfig: any) => {
   const { repeatWeight, currentWeight } = bundledConfig
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
   const totalSeconds = hourInterval * 3600000 + minInterval * 60000
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
   configPushStartFastNotification({ reminders, startFast, endFast })
   configPushWeightNotification({ reminders, currentWeight })
}