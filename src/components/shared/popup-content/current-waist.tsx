import { memo, useState, Dispatch, useRef, SetStateAction } from 'react'
import { Text, TouchableOpacity, Animated, StyleSheet } from 'react-native'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../../../store'
import { updateMetadata } from '../../../store/user'
import UserService from '@services/user'
import PrimaryToggleValue from '../primary-toggle-value'
import MeasureInput from '../measure-input'
import Popup from '@components/shared/popup'
import LinearGradient from 'react-native-linear-gradient'

const { hex: primaryHex, rgb: primaryRgb } = Colors.primary

const Main = ({ 
   animateValue,
   setVisible
}: { 
   animateValue: Animated.Value, 
   setVisible: Dispatch<SetStateAction<any>>
}) => {
   const dispatch = useDispatch()
   const { session, metadata } = useSelector((state: AppState) => state.user)
   const { waistMeasure } = metadata
   const userId: string | null = session && session.user.id || null
   const [ waist, setWaist ] = useState<number>(waistMeasure)

   const onSave = () => {
      Animated.timing(animateValue, {
         toValue: 0, 
         duration: 320, 
         useNativeDriver: true
      }).start(async() => {
         const payload = { waistMeasure: waist }
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
         <PrimaryToggleValue />
         <MeasureInput 
            contentCentered
            symb='cm' 
            value={waist} 
            onChangeText={t => setWaist(+t)} 
            additionalStyles={styles.input} />
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
         width: hS(315),
         title: 'Current waist', 
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
   },

   input: { 
      marginTop: vS(22), 
      marginLeft: hS(28) 
   }
})