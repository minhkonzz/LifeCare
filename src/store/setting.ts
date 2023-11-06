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
         h: 0, 
         m: 0
      }, 
      endWater: {
         h: 0, 
         m: 0
      },
      waterInterval: {
         h: 0, 
         m: 0
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
         state.reminders.beforeStartFast = action.payload
      },

      updateEndFastRemind: (state, action) => {
         state.reminders.beforeEndFast = action.payload
      },

      updateWeightRemind: (state, action) => {
         const { days, h, m } = action.payload
         state.reminders.repeatWeight.days = [...days]
         state.reminders.repeatWeight.h = h
         state.reminders.repeatWeight.m = m
      },

      updateStartWaterRemind: (state, action) => {
         const { h, m } = action.payload
         state.reminders.startWater.h = h
         state.reminders.startWater.m = m
      }, 

      updateEndWaterRemind: (state, action) => {
         const { h, m } = action.payload
         state.reminders.endWater.h = h
         state.reminders.endWater.m = m
      }, 

      updateWaterInterval: (state, action) => {
         const { h, m } = action.payload
         state.reminders.waterInterval.h = h
         state.reminders.waterInterval.m = m
      }
   }
})

export const { 
   updateDarkMode, 
   updateLang, 
   updateStartFastRemind,
   updateEndFastRemind, 
   updateNotififcation,
   updateSyncGoogleFit,
   updateWeightRemind,
   updateStartWaterRemind,
   updateEndWaterRemind,
   updateWaterInterval
} = SettingSlice.actions

export default SettingSlice.reducer