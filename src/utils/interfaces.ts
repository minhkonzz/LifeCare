import { Dispatch, SetStateAction } from 'react'
import { NavigationProp } from '@react-navigation/native'

export interface WaterWaveProps {
   w: number, 
   h: number
}

export interface LoginComponentProps {
   setIsLogin: Dispatch<SetStateAction<boolean>>,
   navigation: NavigationProp<any>
}