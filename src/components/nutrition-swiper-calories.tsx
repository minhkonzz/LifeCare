import { View, Text, StyleSheet } from 'react-native'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { Colors } from '@utils/constants/colors'
import { AnimatedCircularProgress } from 'react-native-circular-progress'

const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary
const { hex: primaryHex } = Colors.primary

export default (): JSX.Element => {
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

const styles = StyleSheet.create({
   horz: {
      flexDirection: 'row', 
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

   swipePart: {
      width: hS(366),
      justifyContent: 'space-between',
      paddingHorizontal: hS(14)
   },

   verticalCenter: {
      alignItems: 'center'
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
   }
})