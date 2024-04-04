import { createSlice } from '@reduxjs/toolkit'
import { SettingState } from '@utils/types'

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
         h: 0,
         m: 6
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

      updateStartFastRemind: (state, action) => {
         const beforeStartFast = action.payload
         state.reminders = {...state.reminders, beforeStartFast }
      },

      updateEndFastRemind: (state, action) => {
         const beforeEndFast = action.payload
         state.reminders = {...state.reminders, beforeEndFast }
      },

      updateWeightRemind: (state, action) => {
         const { days, h, m } = action.payload
         state.reminders.repeatWeight = { days, h, m }
      },

      updateStartWaterRemind: (state, action) => {
         const { h, m } = action.payload
         state.reminders.startWater = { h, m }
      }, 

      updateEndWaterRemind: (state, action) => {
         const { h, m } = action.payload
         state.reminders.endWater = { h, m }
      }, 

      updateWaterInterval: (state, action) => {
         const { h, m } = action.payload
         state.reminders.waterInterval = { h, m }
      }
   }
})

export const { 
   updateDarkMode, 
   updateLang, 
   updateNotififcation,
   updateSyncGoogleFit,
   updateStartFastRemind,
   updateEndFastRemind,
   updateWeightRemind,
   updateStartWaterRemind,
   updateEndWaterRemind,
   updateWaterInterval
} = SettingSlice.actions

export default SettingSlice.reducer