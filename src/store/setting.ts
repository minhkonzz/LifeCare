import { createSlice } from '@reduxjs/toolkit'
import { SettingState } from '@utils/types'

import { 
   configPushNotification,
   configPushWeightNotification,
   configPushStartFastNotification,
   configPushEndFastNotification,
   configPushWaterDrinkNotification
} from '@configs/push-notification'

const initialState: SettingState = {
   notification: false, 
   darkmode: false, 
   syncGoogleFit: false,
   lang: '', 
   reminders: {
      beforeStartFast: 10, 
      beforeEndFast: 5, 
      repeatWeight: {
         days: ['Mon', 'Tue', 'Thurs'], 
         h: 0, 
         m: 0
      }, 
      startWater: {
         h: 8, 
         m: 30
      }, 
      endWater: {
         h: 22, 
         m: 30
      },
      waterInterval: {
         h: 1,
         m: 30
      }
   }
}

const SettingSlice = createSlice({
   name: 'setting', 
   initialState, 
   reducers: {
      updateDarkMode: (state) => {
         state.darkmode = !state.darkmode
      }, 

      updateNotififcation: (state) => {
         state.notification = !state.notification
      }, 

      updateSyncGoogleFit: (state) => {
         state.syncGoogleFit = !state.syncGoogleFit
      },

      updateLang: (state, action) => {
         state.lang = action.payload 
      }, 

      initReminders: (state, action) => {
         const drinked = action.payload
         const { startWater, endWater, waterInterval } = state.reminders
         configPushNotification({
            startWater,
            endWater,
            waterInterval,
            drinked
         })
      },

      updateStartFastRemind: (state, action) => {
         const { startFast, beforeStartFast } = action.payload
         configPushStartFastNotification({ startFast, beforeStartFast })
         state.reminders = {...state.reminders, beforeStartFast }
      },

      updateEndFastRemind: (state, action) => {
         const { endFast, beforeEndFast } = action.payload
         configPushEndFastNotification({ endFast, beforeEndFast })
         state.reminders = {...state.reminders, beforeEndFast }
      },

      updateWeightRemind: (state, action) => {
         const { days, h, m } = action.payload
         state.reminders = {...state.reminders, repeatWeight: { days, h, m } }
      },

      updateStartWaterRemind: (state, action) => {
         const { h, m } = action.payload
         state.reminders = {...state.reminders, startWater: { h, m }}
      }, 

      updateEndWaterRemind: (state, action) => {
         const { h, m } = action.payload
         state.reminders = {...state.reminders, endWater: { h, m }}
      }, 

      updateWaterInterval: (state, action) => {
         const { h, m } = action.payload
         state.reminders = { ...state.reminders, waterInterval: { h, m } }
      }
   }
})

export const { 
   updateDarkMode, 
   updateLang, 
   updateNotififcation,
   updateSyncGoogleFit,
   initReminders,
   updateStartFastRemind,
   updateEndFastRemind,
   updateWeightRemind,
   updateStartWaterRemind,
   updateEndWaterRemind,
   updateWaterInterval
} = SettingSlice.actions

export default SettingSlice.reducer