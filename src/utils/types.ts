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
   prevStartTimeStamp: number, 
   startTimeStamp: number, 
   endTimeStamp: number
}

export type DailyWaterState = {
   date: string, 
   drinked: number, 
   needSync: boolean,
   initCupsize: number,
   customCupsize: number,
   cupsize: number,
   specs: any[]
   changes: Array<{ id: string, liquid: number, time: string }>
}

export type Message = {
   id: string, 
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

export type UserState = {
   session: any,
   metadata: any,
   queuedActions: any
}

export type WaterRecordsPayload = {
   goal: number, 
   value: number,
   createdAt: string,
   updatedAt: string,
   times: Array<{ id: string, value: number, createdAt: string, updatedAt: string }>,
   date: string
}

