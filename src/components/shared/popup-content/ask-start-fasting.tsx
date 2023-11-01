import { memo, ReactNode, SetStateAction, useRef, Dispatch } from 'react'
import {
   View, 
   Text,
   StyleSheet, 
   TouchableOpacity,
   Animated
} from 'react-native'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { updateCurrentPlan, updateNewPlan } from '../../../store/fasting'
import Popup from '@components/shared/popup'
import LinearGradient from 'react-native-linear-gradient'

const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary
const { hex: primaryHex, rgb: primaryRgb } = Colors.primary

export default memo(({ setVisible }: { setVisible: Dispatch<SetStateAction<ReactNode>> }): JSX.Element => {
   const navigation = useNavigation()
   const dispatch = useDispatch()

   const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current

   const onConfirm = (isAllowed: boolean) => {
      Animated.timing(animateValue, {
         toValue: 0, 
         duration: 300, 
         useNativeDriver: true
      }).start(({ finished }) => {
         const targetRoute = isAllowed && 'day-plan' || 'main'
         if (targetRoute === 'main') dispatch(updateCurrentPlan())
         navigation.navigate(targetRoute)
      })
   }

   const onSelfClose = () => {
      dispatch(updateNewPlan(null))
   }

   return (
      <Popup {...{ 
         type: 'centered', 
         title: 'Confirm',
         width: hS(300), 
         animateValue, 
         setVisible, 
         onSelfClose
      }}>
         <Text style={styles.content}>Do you want to start fasting now with new plan?</Text>
         <View style={[styles.buttons, styles.horz]}>
            <TouchableOpacity style={styles.button} 
               activeOpacity={.7} 
               onPress={() => onConfirm(true)}>
               <LinearGradient 
                  style={styles.buttonBg}
                  colors={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]}
                  start={{ x: .5, y: 0 }}
                  end={{ x: .5, y: 1 }}>
                  <Text style={styles.buttonText}>Yes</Text>
               </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} activeOpacity={.7} onPress={() => onConfirm(false)}>
               <LinearGradient 
                  style={styles.buttonBg}
                  colors={[`rgba(${darkRgb.join(', ')}, .6)`, darkHex]}
                  start={{ x: .5, y: 0 }}
                  end={{ x: .5, y: 1 }}>
                  <Text style={styles.buttonText}>Later</Text>
               </LinearGradient>
            </TouchableOpacity>
         </View>
      </Popup>
   )
})

const styles = StyleSheet.create({
   buttons: {
      width: '100%', 
      justifyContent: 'space-between'
   },

   horz: {
      flexDirection: 'row', 
      alignItems: 'center'
   },

   button: {
      width: '48%',
      height: vS(60), 
      borderRadius: hS(32), 
      overflow: 'hidden', 
      marginTop: vS(20)
   },

   content: {
      width: hS(220),
      fontFamily: 'Poppins-Medium', 
      fontSize: hS(12), 
      color: darkHex, 
      letterSpacing: .2, 
      textAlign: 'center', 
      lineHeight: vS(22)
   },

   buttonBg: {
      width: '100%',
      height: '100%',
      justifyContent: 'center', 
      alignItems: 'center'
   }, 

   buttonText: {
      fontFamily: 'Poppins-Medium', 
      fontSize: hS(14), 
      color: '#fff', 
      letterSpacing: .2
   }
})