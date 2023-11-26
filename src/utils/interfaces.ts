import { ReactNode, Dispatch, SetStateAction } from 'react'
import { NavigationProp } from '@react-navigation/native'

export interface WaterWaveProps {
   w: number, 
   h: number
}

export interface LoginComponentProps {
   setIsLogin: Dispatch<SetStateAction<boolean>>
   invokeAuthMessage: (message: string, type: string) => void
   navigation: NavigationProp<any>
}

export interface WheelPickerProps {
   items: string[] | number[]
	itemHeight: number, 
   fs?: number,
	onIndexChange?: (index: number) => void,
}

export interface OptionProps {
   item: string, 
   index: number, 
   stateKey: string, 
   action: any
}

export interface AnimatedNumberProps {
   value: number, 
   style?: any
}

export interface NutritionEditorProps {
   title: string,
   totalCalories: number,
   caloriesMethod: string,
   children?: ReactNode
}

export interface RadioOptionsPopupProps {
   options: Array<string> 
   setVisible: Dispatch<SetStateAction<boolean>>
}

export interface NetworkState {
   isOnline: boolean
}

export interface SurveyState {
   surveyIndex: number 
   goal: string[]
   fastingFamiliar: string
   exercisePerformance: string 
   gender: string
   age: number
   currentHeight: number
   currentWeight: number
   goalWeight: number  
}

export interface InitialPersonalData {
   gender?: string
   age?: number
   currentHeight?: number
   currentWeight?: number
   startWeight?: number 
   goalWeight?: number
   exercisePerformance?: string
   fastingFamiliar?: string
   goal?: string[],
   isSurveyed?: boolean
}

export interface PersonalData extends InitialPersonalData {
   chestMeasure?: number
   thighMeasure?: number
   waistMeasure?: number
   hipsMeasure?: number 
   dailyWater?: number 
   dailyCarbs?: number 
   dailyFat?: number
   dailyProtein?: number
   name?: string 
   email?: string
   waterRecords?: Array<{
      id: string,
      value: number, 
      goal: number, 
      date: string,  // "2023-11-23"
      createdAt: string,  // UTC time
      updatedAt: string,
      times: Array<{
         id: string, 
         value: number, 
         createdAt: string,
         updatedAt: string
      }>
   }>
   fastingRecords: Array<{
      id: string, 
      planName: string, 
      startTimeStamp: number,
      endTimeStamp: number, 
      notes: string, 
      createdAt: string,
      updatedAt: string
   }>
   bodyRecords: Array<{
      id: string, 
      value: number, 
      type: string,
      createdAt: string,
      updatedAt: string
   }>
}