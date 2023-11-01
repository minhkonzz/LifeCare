import { useMemo } from 'react'
import { Dimensions } from 'react-native' 
import { curveBasis, line } from 'd3-shape'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { parse } from 'react-native-redash'
import { BOTTOM_NAVIGATOR_HEIGHT } from '@utils/constants/screen'
import { verticalScale as vS } from '@utils/responsive'

const SCREEN_WIDTH: number = Dimensions.get('window').width

type GenerateTabShapePath = (
   position: number, 
   adjustedHeight: number
) => string

const NUM_TABS: number = 5
const SCALE: number = .7
const TAB_BAR_HEIGHT: number = vS(BOTTOM_NAVIGATOR_HEIGHT)

const generateTabShapePath: GenerateTabShapePath = (position, adjustedHeight) => {
    const adjustedWidth = SCREEN_WIDTH / NUM_TABS
    const tabX = adjustedWidth * position
    const lineGenerator = line().curve(curveBasis)
    const tab = lineGenerator([
	    [ tabX - 100 * SCALE, 0 ],
        [ tabX - 96 * SCALE, 0 ],
        [ tabX - 58 * SCALE, -1 * SCALE ],
        [ tabX - 32 * SCALE, (adjustedHeight - 22) * SCALE ],
        [ tabX + 32 * SCALE, (adjustedHeight - 22) * SCALE ],
        [ tabX + 58 * SCALE, -1 * SCALE ],
        [ tabX + 96 * SCALE, 0 ],
        [ tabX + 100 * SCALE, 0 ],
    ])
    return `${tab}`
}

export default () => {
   const insets = useSafeAreaInsets()
   const tHeight = TAB_BAR_HEIGHT + insets.bottom
   const adjustedHeight = tHeight - insets.bottom 

   const containerPath = useMemo(() => `
       M0, 0L${SCREEN_WIDTH},0L${SCREEN_WIDTH},0L${SCREEN_WIDTH},${tHeight}L0,${tHeight}L0,0
   `, [ tHeight ])

   const curvedPaths = useMemo(() => Array.from({ length: NUM_TABS }, (_, index) => {
       const tabShapePath = generateTabShapePath(index + .5, adjustedHeight)
       return parse(`${tabShapePath}`)
   }), [ adjustedHeight ])

   return { containerPath, curvedPaths, tHeight }
}
