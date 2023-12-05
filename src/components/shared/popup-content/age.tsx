import { memo, Dispatch, SetStateAction, useRef } from 'react'
import { Text, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../../../store'
import { updateMetadata } from '../../../store/user'
import { NETWORK_REQUEST_FAILED } from '@utils/constants/error-message'
import Popup from '../popup'
import LinearGradient from 'react-native-linear-gradient'
import WheelPicker from '../wheel-picker'
import UserService from '@services/user'

const { hex: primaryHex, rgb: primaryRgb } = Colors.primary
const ageNumbers: Array<number> = Array.from({ length: 120 }, (_, i) => i + 1)

const Main = ({
   animateValue, 
   setVisible
}: {
   animateValue: Animated.Value,
   setVisible: Dispatch<SetStateAction<boolean>>
}) => {
   const dispatch = useDispatch()
   const { session, metadata } = useSelector((state: AppState) => state.user)
   const userId: string | null = session && session?.user.id || null
   const { age } = metadata

   const onSave = () => {
      Animated.timing(animateValue, {
         toValue: 0, 
         duration: 320, 
         useNativeDriver: true
      }).start(async() => {
         const payload = { age }
         if (userId) {
            const errorMessage: string = await UserService.updatePersonalData(userId, payload)
            return
         }
         dispatch(updateMetadata(payload))
         setVisible(false)
      })
   }

   return (
      <>
         <WheelPicker items={ageNumbers} itemHeight={vS(72)} />
         <TouchableOpacity
            onPress={onSave}
            activeOpacity={.7}
            style={styles.button}>
            <LinearGradient
               style={styles.buttonBg}
               colors={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]}
               start={{ x: .5, y: 0 }}
               end={{ x: .5, y: 1 }}>
               <Text style={styles.buttonText}>Save</Text>
            </LinearGradient>
         </TouchableOpacity>
      </>
   )
}

export default memo(({ setVisible }: { setVisible: Dispatch<SetStateAction<boolean>> }) => {
   const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current

   return (
      <Popup {...{
         type: 'centered',
         title: 'Age',
         width: hS(332),
         animateValue,
         setVisible         
      }}>
         <Main {...{ animateValue, setVisible }} />
      </Popup>
   )
})

const styles = StyleSheet.create({
   button: {
      width: '100%',
      height: vS(82),
      borderRadius: hS(32),
      overflow: 'hidden',
      marginTop: vS(20)
   },

   buttonBg: {
      width: '100%',
      height: '100%',
      justifyContent: 'center', 
      alignItems: 'center'
   }, 

   buttonText: {
      fontFamily: 'Poppins-SemiBold', 
      fontSize: hS(14), 
      color: '#fff', 
      letterSpacing: .2
   }
})