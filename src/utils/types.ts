import { ReactNode, Dispatch, SetStateAction } from 'react'

export type AuthState = {
   email: string, 
   password: string, 
   passwordConfirm: string, 
   name: string
}

export type PlanSelectionType = {
   planCategoryId: string, 
   planId: string
}

export type PlanSelectionContextType = {
   planSelected: PlanSelectionType, 
   setPlanSelected: Dispatch<SetStateAction<PlanSelectionType>>
}

export type PopupContextType = {
   popup: ReactNode, 
   setPopup: Dispatch<SetStateAction<ReactNode>>
}

export type FastingState = {
   newPlan: any,
   currentPlan: any, 
   startTimeStamp: number, 
   endTimeStamp: number,
   isFasting: boolean
}

export type SettingState = {
   notification: boolean, 
   darkmode: boolean, 
   syncGoogleFit: boolean, 
   lang: string,
   reminders: {
      beforeStartFast: number
      beforeEndFast: number, 
      repeatWeight: {
         days: number[], 
         h: number, 
         m: number
      }, 
      startWater: {
         h: number, 
         m: number
      }, 
      endWater: {
         h: number, 
         m: number
      }, 
      waterInterval: {
         h: number, 
         m: number
      }
   }
}

export type WaterRecordsPayload = {
   goal: number, 
   drinked: number,
   changes: Array<{ liquid: number, time: string }>
}

export type InitialPersonalData = {
   gender: string, 
   current_height: number, 
   current_weight: number,
   start_weight: number, 
   target_weight: number, 
   age: number,
   exercise_performance: string,
   fasting_familiar: string,
   is_surveyed: boolean
}

