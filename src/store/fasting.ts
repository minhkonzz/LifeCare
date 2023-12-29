import { createSlice } from '@reduxjs/toolkit'
import { FastingState } from '@utils/types'

const initialState: FastingState = {
   newPlan: null, 
   currentPlan: null,
   prevStartTimeStamp: 0, 
   startTimeStamp: 0,
   endTimeStamp: 0
}

const FastingSlice = createSlice({
   name: 'fasting', 
   initialState, 
   reducers: {
      updateNewPlan: (state, action) => {
         state.newPlan = action.payload
      },

      updateCurrentPlan: (state, action) => {
         const currentPlan = action.payload
         if (currentPlan) {
            state.currentPlan = currentPlan
            return
         }
         state.currentPlan = { ...state.newPlan }
      },

      updateTimes: (state, action) => {
         const { startTimeStamp, endTimeStamp } = action.payload
         state.startTimeStamp = startTimeStamp, 
         state.endTimeStamp = endTimeStamp
      },

      resetTimes: (state) => {
         state.startTimeStamp = 0
         state.endTimeStamp = 0
      }
   }
})

export const { 
   updateNewPlan, 
   updateCurrentPlan,
   updateTimes,
   resetTimes
}  = FastingSlice.actions
export default FastingSlice.reducer