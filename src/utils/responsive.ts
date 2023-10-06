import { Dimensions } from 'react-native'
import { BASE_WIDTH, BASE_HEIGHT } from '@utils/constants/screen' 

const { width, height }= Dimensions.get('window')
const [ SCREEN_WIDTH, SCREEN_HEIGHT ] = width < height && [ width, height ] || [ height, width ]

export { SCREEN_WIDTH, SCREEN_HEIGHT }
export const horizontalScale = (size: number): number => SCREEN_WIDTH * size / BASE_WIDTH
export const verticalScale = (size: number): number => SCREEN_HEIGHT * size / BASE_HEIGHT
