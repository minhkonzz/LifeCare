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
   goalWeight: 0 
}

const SurveySlice = createSlice({
   name: 'survey', 
   initialState, 
   reducers: {
      updateSurveyIndex: (state, action) => {
         state.surveyIndex = action.payload
      },
      updateGoal: (state, action) => {
         state.goal = action.payload
      },
      updateFastingFamiliar: (state, action) => {
         state.fastingFamiliar = action.payload
      },
      updateExercisePerformance: (state, action) => {
         state.exercisePerformance = action.payload
      },
      updateGender: (state, action) => {
         state.gender = action.payload
      },
      updateAge: (state, action) => {
         state.age = action.payload
      },
      updateCurrentHeight: (state, action) => {
         state.currentHeight = action.payload
      },
      updateCurrentWeight: (state, action) => {
         state.currentWeight = action.payload
      },
      updateGoalWeight: (state, action) => {
         state.goalWeight = action.payload
      }
   }
})

export const { 
   updateSurveyIndex,
   updateGoal, 
   updateFastingFamiliar, 
   updateExercisePerformance,
   updateGender,
   updateAge,
   updateCurrentHeight, 
   updateCurrentWeight,
   updateGoalWeight
 } = SurveySlice.actions
 
export default SurveySlice.reducer