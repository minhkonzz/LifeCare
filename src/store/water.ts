import { createSlice } from '@reduxjs/toolkit'
import { autoId } from '@utils/helpers'
import { DailyWaterState } from '@utils/types'
import { getCurrentDate, getLocalDatetimeV2 } from '@utils/datetimes'

const initialState: DailyWaterState = {
   date: getCurrentDate(),
   firstTimeReachGoal: false,
   drinked: 0,
   needSync: false,
   initCupsize: 200,
   customCupsize: 0,
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
               time: getLocalDatetimeV2()
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

      updateCustomCupsize: (state, action) => {
         const cupsize = action.payload
         state.cupsize = cupsize
         state.customCupsize = cupsize 
      },

      updateFirstTimeReachGoal: (state) => {
         state.firstTimeReachGoal = true 
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
   updateFirstTimeReachGoal,
   updateLiquid,
   updateCupsize,
   resetSpecs,
   resetDailyWater,
   updateCustomCupsize
} = WaterSlice.actions

export default WaterSlice.reducer