import { Dimensions } from 'react-native'
import { BASE_WIDTH, BASE_HEIGHT } from '@utils/constants/screen.ts' 

const { width, height }: ScaledSize = Dimensions.get('window')
const [ SCREEN_WIDTH, SCREEN_HEIGHT ] = width < height && [ width, height ] || [ height, width ]

export const horizontalScale = (size): number => SCREEN_WIDTH * size / BASE_WIDTH
export const verticalScale = (size): number => SCREEN_HEIGHT * size / BASE_HEIGHT
