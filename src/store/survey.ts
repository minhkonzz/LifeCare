import { createSlice } from '@reduxjs/toolkit'
import { SurveyState } from '@utils/interfaces'

const initialState: SurveyState = {
   surveyIndex: 0, 
   goal: [],
   fastingFamiliar: '',
   exercisePerformance: '',
   gender: '',
   age: 0, 
   currentHeight: 0,
   currentWeight: 0, 
   goalWeight: 0,
   firstMealTime: '',
   lastMealTime: '',
   healthConcerns: [],
   sleepHours: ''
}

const SurveySlice = createSlice({
   name: 'survey', 
   initialState, 
   reducers: {
      updateSurveyIndex: (state, action) => {
         state.surveyIndex = action.payload
      },

      submitSurveyOption: (state, action) => {
         const { k, v } = action.payload
         state[k] = v
      }
   }
})

export const { 
   updateSurveyIndex,
   submitSurveyOption
 } = SurveySlice.actions
 
export default SurveySlice.reducer