import { Dispatch, SetStateAction } from 'react'
import { NavigationProp } from '@react-navigation/native'
import { Animated } from 'react-native'

export interface WaterWaveProps {
   w: number, 
   h: number
}

export interface LoginComponentProps {
   setIsLogin: Dispatch<SetStateAction<boolean>>,
   navigation: NavigationProp<any>
}

export interface WheelPickerProps {
   items: string[] | number[]
	itemHeight: number
	onIndexChange?: (index: number) => void
}

export interface OptionProps {
   item: string, 
   index: number, 
   stateKey: string, 
   action: any
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