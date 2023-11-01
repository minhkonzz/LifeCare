import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   goal: 0,
   date: '',
   drinked: 0,
   initCupsize: 200,
   cupsize: 0,
   changes: []
}

const WaterSlice = createSlice({
   name: 'water', 
   initialState,
   reducers: {
      updateLiquid: (state, action) => {
         const type = action.payload
         state.drinked += state.cupsize * (type && 1 || -1) 
         state.changes = type && state.changes.slice(0, -1) || [
            ...state.changes, 
            { 
               liquid: state.cupsize, 
               time: new Intl.DateTimeFormat('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true
               }).format(new Date())
            }
         ]
      },
      
      updateCupsize: (state, action) => {
         state.cupsize = action.payload
      },

      resetDailyWater: (state, action) => {
         const now = action.payload
         if (now !== state.date) {
            state.date = now
            state.drinked = 0, 
            state.changes = []
         }
      }
   }
})

export const {
   updateLiquid,
   updateCupsize,
   resetDailyWater
} = WaterSlice.actions

export default WaterSlice.reducer