import { createSlice } from '@reduxjs/toolkit'
import { FastingState } from '@utils/types'

const initialState: FastingState = {
   planCategoryId: '',
   planId: '',
   startTimeStamp: 0
}

const FastingSlice = createSlice({
   name: 'fasting', 
   initialState, 
   reducers: {
      updateNewPlan: (state, action) => {
         const { planCategoryId, planId } = action.payload
         state.planCategoryId = planCategoryId, 
         state.planId = planId
      },

      updateStartTime: (state, action) => {
         state.startTimeStamp = action.payload
      }
   }
})

export const { updateStartTime, updateNewPlan }  = FastingSlice.actions
export default FastingSlice.reducer