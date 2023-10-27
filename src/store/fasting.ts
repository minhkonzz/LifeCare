import { createSlice } from '@reduxjs/toolkit'
import { FastingState } from '@utils/types'

const initialState: FastingState = {
   planCategoryId: '',
   planId: '',
   startTimeStamp: 0,
   endTimeStamp: 0
}

const FastingSlice = createSlice({
   name: 'fasting', 
   initialState, 
   reducers: {
      updateFastingTimes: (state, action) => {
         const { _start, _end } = action.payload
         state.startTimeStamp = _start
         state.endTimeStamp = _end
      }
   }
})

export const { updateFastingTimes }  = FastingSlice.actions
export default FastingSlice.reducer