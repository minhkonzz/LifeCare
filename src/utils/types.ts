import { ReactNode, Dispatch, SetStateAction } from 'react'

export type AuthState = {
   email: string, 
   password: string, 
   passwordConfirm: string, 
   name: string
}

export type PopupContextType = {
   popup: ReactNode, 
   setPopup: Dispatch<SetStateAction<ReactNode>>
}

export type FastingState = {
   planCategoryId: string,
   planId: string, 
   startTimeStamp: number, 
   endTimeStamp: number
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

