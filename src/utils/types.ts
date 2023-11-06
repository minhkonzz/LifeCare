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

export type Message = {
   id: number, 
   sender: string,
   text: string
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
         days: string[], 
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
   userId: string,
   goal: number, 
   drinked: number,
   changes: Array<{ liquid: number, time: string }>
}

