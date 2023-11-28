import { createSlice } from '@reduxjs/toolkit'
import { autoId } from '@utils/helpers'
import { DailyWaterState } from '@utils/types'
import { getCurrentDate } from '@utils/datetimes'

const initialState: DailyWaterState = {
   date: getCurrentDate(),
   drinked: 0,
   needSync: false,
   initCupsize: 200,
   cupsize: 250,
   specs: [],
   changes: []
}

const WaterSlice = createSlice({
   name: 'water', 
   initialState,
   reducers: {
      updateLiquid: (state, action) => {
         if (!state.needSync) state.needSync = true
         const type = action.payload
         state.drinked += state.cupsize * (type && 1 || -1) 
         if (type) {
            const newId = autoId('wtr')
            const newChange = { 
               id: newId,
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
            state.changes = [...state.changes, newChange]
            state.specs = [...state.specs, { ...newChange, type }]
            return
         }
         const includedIncrease: boolean = state.specs.some(e => e.type)
         if (includedIncrease) {
            state.specs = state.specs.slice(0, -1)
         } else {
            const lastChange = state.changes.pop()
            state.specs = [...state.specs, { ...lastChange, type }]
         }
         state.changes = state.changes.slice(0, -1)
      },
      
      updateCupsize: (state, action) => {
         state.cupsize = action.payload
      },

      resetSpecs: (state) => {
         state.specs = []
         state.needSync = false
      },

      resetDailyWater: (state, action) => {
         state.date = action.payload
         state.drinked = 0, 
         state.needSync = false
         state.specs = []
         state.changes = []
      }
   }
})

export const {
   updateLiquid,
   updateCupsize,
   resetSpecs,
   resetDailyWater
} = WaterSlice.actions

export default WaterSlice.reducer