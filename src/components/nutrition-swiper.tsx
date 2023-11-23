import { memo } from 'react'

import {
   View, 
   Text,
   Animated, 
   TouchableOpacity,
   StyleSheet
} from 'react-native'

import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import LinearGradient from 'react-native-linear-gradient'
import { EditIcon } from '@assets/icons'
import Calories from '@components/nutrition-swiper-calories'
import HealthNutrients from '@components/nutrition-swiper-health-nutrients'
import Macros from '@components/nutrition-swiper-macros'
import Carousel from './shared/carousel'

const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary
const { hex: lightHex, rgb: lightRgb } = Colors.lightPrimary

const carouselData = [
   HealthNutrients,
   Macros,
   Calories
]

export default memo((): JSX.Element => {
   return (
      <LinearGradient 
         style={styles.container}
         colors={[`rgba(${lightRgb.join(', ')}, .3)`, lightHex]}
         start={{ x: .5, y: 0 }}
         end={{ x: .52, y: .5 }}>
         <View style={[styles.header, styles.horz]}>
            <Text style={styles.title}>Calories</Text>
            <View style={styles.horz}>
               <Text style={styles.goalIntake}>Goal intake: 1500 kcal</Text>
               <TouchableOpacity 
                  style={styles.goalIntakeEditButton}
                  activeOpacity={.8}>
                  <EditIcon width={hS(16)} height={vS(14)} />
               </TouchableOpacity>
            </View>
         </View>
         <Carousel 
            data={Array.from({ length: carouselData.length }).fill(1)} 
            items={carouselData} 
            style={styles.carousel} />
      </LinearGradient>
   )
})

const styles = StyleSheet.create({
   carousel: {
      width: hS(366),
      height: vS(180)
   },

   verticalCenter: {
      alignItems: 'center'
   },

   container: {
      width: hS(366),
      height: vS(265),
      borderRadius: hS(32), 
      marginTop: vS(28), 
      paddingVertical: vS(15), 
      paddingHorizontal: hS(14),
      alignItems: 'center',
      justifyContent: 'space-between'
   }, 

   horz: {
      flexDirection: 'row', 
      alignItems: 'center'
   },

   header: {
      width: '100%', 
      justifyContent: 'space-between'
   },

   title: {
      fontFamily: 'Poppins-SemiBold', 
      fontSize: hS(14),
      color: darkHex, 
      letterSpacing: .2
   },

   goalIntake: {
      fontFamily: 'Poppins-Medium', 
      fontSize: hS(10), 
      color: `rgba(${darkRgb.join(', ')}, .8)`,
      letterSpacing: .2,
      marginRight: hS(10)
   },

   goalIntakeEditButton: {
      width: hS(32), 
      height: vS(32), 
      justifyContent: 'center', 
      alignItems: 'center',
      borderRadius: 100,
      backgroundColor: `rgba(${darkRgb.join(', ')}, .12)`
   }, 

   dot: {
      width: hS(8), 
      height: vS(8), 
      backgroundColor: `rgba(${darkRgb.join(', ')}, .18)`, 
      borderRadius: 20, 
      marginHorizontal: hS(3)
   },

   swiper: {
      marginBottom: vS(21)
   }
})