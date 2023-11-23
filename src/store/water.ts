import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   date: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric' }),
   drinked: 0,
   initCupsize: 200,
   cupsize: 250,
   changes: []
}

const WaterSlice = createSlice({
   name: 'water', 
   initialState,
   reducers: {
      updateLiquid: (state, action) => {
         const type = action.payload
         state.drinked += state.cupsize * (type && 1 || -1) 
         state.changes = type && [
            ...state.changes, 
            { 
               liquid: state.cupsize, 
               time: new Intl.DateTimeFormat('en', {
                  year: '2-digit',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
               }).format(new Date())
            }
         ] || state.changes.slice(0, -1)
      },
      
      updateCupsize: (state, action) => {
         state.cupsize = action.payload
      },

      resetDailyWater: (state, action) => {
         state.date = action.payload
         state.drinked = 0, 
         state.changes = []
      }
   }
})

export const {
   updateLiquid,
   updateCupsize,
   resetDailyWater
} = WaterSlice.actions

export default WaterSlice.reducer