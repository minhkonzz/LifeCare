import { ReactNode } from 'react'
import {
   View,
   ScrollView, 
   Platform, 
   StatusBar, 
   StyleSheet
} from 'react-native'

import { BOTTOMBAR_HEIGHT } from '@utils/constants/screen'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { useDeviceBottomBarHeight } from '@hooks/useDeviceBottomBarHeight'

interface ScreenProps {
   paddingHorzContent?: boolean
   scroll?: boolean
   full?: boolean,
   additionalStyles?: any, 
   children?: ReactNode
} 

export default ({ 
   paddingHorzContent, 
   scroll, 
   full, 
   additionalStyles, 
   children 
}: ScreenProps): JSX.Element => {
   const bottomBarHeight: number = useDeviceBottomBarHeight() 
   const bottomIndicatorStyles = {
      marginBottom: vS(27) + (full ? 0 : BOTTOMBAR_HEIGHT)
   }
   return (
      <View style={styles.container}>
         {
            scroll && 
            <ScrollView 
               showsVerticalScrollIndicator={false}
               contentContainerStyle={[
                  styles.children, 
                  additionalStyles, 
                  { 
                     paddingBottom: bottomBarHeight,
                     paddingHorizontal: (paddingHorzContent ? hS(22) : 0)
                  }
               ]}>
               { children }
               <View style={bottomIndicatorStyles} />
            </ScrollView> || 
            <View style={[
               styles.children,
               additionalStyles, 
               {
                  paddingBottom: bottomBarHeight,  
                  paddingHorizontal: (paddingHorzContent ? hS(22) : 0) 
               }
            ]}>
               { children }
               <View style={bottomIndicatorStyles} />
            </View>
         }
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1, 
      backgroundColor: '#fff'
   }, 

   children: {
      width: '100%',
      paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0, 
      alignItems: 'center'
   }
})