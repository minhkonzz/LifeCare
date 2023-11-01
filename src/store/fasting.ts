import { createSlice } from '@reduxjs/toolkit'
import { FastingState } from '@utils/types'

const initialState: FastingState = {
   newPlan: null, 
   currentPlan: null,
   startTimeStamp: 0,
   endTimeStamp: 0, 
   isFasting: false
}

const FastingSlice = createSlice({
   name: 'fasting', 
   initialState, 
   reducers: {
      updateNewPlan: (state, action) => {
         state.newPlan = action.payload
      },

      updateCurrentPlan: (state) => {
         state.currentPlan = { ...state.newPlan }
         state.newPlan = null
      },

      updateTimes: (state, action) => {
         const { _start, _end } = action.payload
         state.startTimeStamp = _start, 
         state.endTimeStamp = _end
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