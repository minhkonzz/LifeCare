import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { AppStore } from '@store/index'

import { 
   configPushWeightNotification,
   configPushWaterDrinkNotification,
   configPushEndFastNotification,
   configPushStartFastNotification,
   configPushNotification
} from "@configs/push-notification"

export default (): JSX.Element => {
   const { drinked } = useSelector((state: AppStore) => state.water)
   const { reminders } = useSelector((state: AppStore) => state.setting)

   const { 
      beforeStartFast,
      beforeEndFast,
      startWater, 
      endWater, 
      waterInterval 
   } = reminders

   useEffect(() => {
      configPushNotification({ startWater, endWater, waterInterval, drinked })
   }, [])

   useEffect(() => {
      configPushWaterDrinkNotification({ drinked, startWater, endWater, waterInterval })
   }, [drinked, startWater, endWater, waterInterval])

   return <></>
}