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
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import EditIcon from '@assets/icons/edit.svg'

const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary
const { hex: lightHex, rgb: lightRgb } = Colors.lightPrimary
const { hex: primaryHex, rgb: primaryRgb } = Colors.primary

function Calories() {
   function Part({ title, value }: { title: string, value: number }) {
      return (
         <View style={styles.verticalCenter}>
            <View style={styles.caloriesPartTitle}>
               <Text style={styles.caloriesPartTitleText}>{title}</Text>
            </View>
            <Text style={styles.caloriesPartValue}>{value}</Text>
         </View>
      )
   }
   return (
      <View style={[styles.swipePart, styles.horz]}>
         <Part title='Eaten' value={25} />
         <View style={styles.kcalLeft}>
				<AnimatedCircularProgress
               lineCap='round'
					width={hS(11)}
					size={hS(132)}
					rotation={360}
					fill={80}
					tintColor={primaryHex}
					onAnimationComplete={() => console.log('Animate completed')}
					backgroundColor={`rgba(${darkRgb.join(', ')}, .1)`} 
            />
            <View style={styles.kcalLeftInside}>
               <Text style={styles.kcalLeftTitle}>Kcal left</Text>
               <Text style={styles.kcalLeftValue}>1492</Text>
               <View style={styles.helpIndicator}>
                  <Text style={styles.helpIndicatorText}>?</Text>
               </View>
            </View>
			</View>
         <Part title='Burned' value={17} />
      </View>
   )
}

export default (): JSX.Element => {
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
         <View style={styles.verticalCenter}>
            <Animated.View
               style={styles.swiper}>
               <Calories />
            </Animated.View>
            <View style={styles.horz}>
               <View style={styles.dot} />
               <View style={styles.dot} />
               <View style={styles.dot} />
            </View>
         </View>
      </LinearGradient>
   )
}

const styles = StyleSheet.create({
   container: {
      width: '100%',
      height: vS(244),
      borderRadius: hS(32), 
      marginTop: vS(28), 
      paddingVertical: vS(15), 
      paddingLeft: hS(17),
      paddingRight: hS(12),
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

   swipePart: {
      width: '100%'
   },

   verticalCenter: {
      alignItems: 'center'
   },

   caloriesPartTitle: {
      width: hS(66),
      height: vS(20),
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: `rgba(${darkRgb.join(', ')}, .18)`,
      borderRadius: 50
   }, 

   caloriesPartTitleText: {
      fontFamily: 'Poppins-Medium',
      fontSize: hS(10), 
      color: darkHex,
      letterSpacing: .2
   },

   caloriesPartValue: {
      fontFamily: 'Poppins-SemiBold', 
      fontSize: hS(14), 
      color: darkHex, 
      letterSpacing: .2,
      marginTop: vS(7)
   },

   kcalLeft: {
      width: hS(132), 
      height: vS(132),
      marginHorizontal: hS(25),
      justifyContent: 'center',
      alignItems: 'center',
      padding: 2,
      backgroundColor: '#fff',
      borderRadius: 1000
   }, 

   kcalLeftInside: {
      alignItems: 'center',
      position: 'absolute',
      borderRadius: 1000
   },

   kcalLeftTitle: {
      fontFamily: 'Poppins-Medium', 
      fontSize: hS(10), 
      color: `rgba(${darkRgb.join(', ')}, .8)`,
      letterSpacing: .2
   }, 

   kcalLeftValue: {
      fontFamily: 'Poppins-SemiBold', 
      fontSize: hS(18),
      color: darkHex, 
      letterSpacing: .2
   },

   helpIndicator: {
      width: hS(17), 
      height: vS(17), 
      justifyContent: 'center', 
      alignItems: 'center', 
      borderRadius: 50,
      backgroundColor: `rgba(${darkRgb.join(', ')}, .18)`
   },

   helpIndicatorText: {
      fontSize: hS(10)
   },

   swiper: {
      marginBottom: vS(21)
   }
})