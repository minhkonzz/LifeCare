import { memo, SetStateAction, useRef, Dispatch } from 'react'
import { darkHex, darkRgb, primaryHex, primaryRgb } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '@store/index'
import { enqueueAction } from '@store/user'
import { updateCurrentPlan, updateNewPlan } from '@store/fasting'
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import { autoId } from '@utils/helpers'
import { NETWORK_REQUEST_FAILED } from '@utils/constants/error-message'
import withSync from '@hocs/withSync'
import UserService from '@services/user'
import Popup from '@components/shared/popup'
import LinearGradient from 'react-native-linear-gradient'
import useSession from '@hooks/useSession'

export default memo(withSync(({ 
   setVisible,
   isOnline 
}: { 
   setVisible: Dispatch<SetStateAction<any>>,
   isOnline: boolean 
}): JSX.Element => {
   const navigation = useNavigation<any>()
   const dispatch = useDispatch()
   const { newPlan } = useSelector((state: AppState) => state.fasting)
   const { userId } = useSession()
   const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current

   const onConfirm = (isAllowed: boolean) => {
      Animated.timing(animateValue, {
         toValue: 0, 
         duration: 300, 
         useNativeDriver: true
      }).start(async() => {
         const targetRoute = isAllowed && 'day-plan' || 'main'
         if (targetRoute === 'main') {
            const currentPlanId = newPlan.id
            const payload = { currentPlanId }
            
            const cache = () => {
               dispatch(updateCurrentPlan())
               if (userId && !isOnline) {
                  dispatch(enqueueAction({
                     userId,
                     actionId: autoId('qaid'),
                     invoker: 'updatePersonalData',
                     name: 'UPDATE_CURRENT_PLAN',
                     params: [userId, payload]
                  }))
               }
            }

            if (userId) {
               const errorMessage: string = await UserService.updatePersonalData(userId, payload)
               if (errorMessage === NETWORK_REQUEST_FAILED) cache()
            }
            else cache()
         }
         navigation.navigate(targetRoute)
         setVisible(null)
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
}))

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