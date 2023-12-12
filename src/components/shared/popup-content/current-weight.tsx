import { memo, useState, Dispatch, useRef, SetStateAction } from 'react'
import { Text, TouchableOpacity, Animated, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../../../store'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { updateMetadata } from '../../../store/user'
import PrimaryToggleValue from '../primary-toggle-value'
import MeasureInput from '../measure-input'
import Popup from '@components/shared/popup'
import LinearGradient from 'react-native-linear-gradient'
import UserService from '@services/user'

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
   const userId: string | null = session && session.user.id || null
   const { currentWeight } = metadata
   const [ weight, setWeight ] = useState<number>(currentWeight)

   const onSave = () => {
      Animated.timing(animateValue, {
         toValue: 0, 
         duration: 320, 
         useNativeDriver: true
      }).start(async() => {
         const payload = { currentWeight: weight }
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
            symb='kg' 
            value={weight} 
            onChangeText={t => setWeight(+t)} />
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
         width: hS(300),
         title: 'Current weight', 
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