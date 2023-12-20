import { useState, Dispatch, SetStateAction } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '@store/index'
import { updateMetadata } from '@store/user'
import { inchToCentimeter, centimeterToInch } from '@utils/fomular'
import withPopupBehavior from '@hocs/withPopupBehavior'
import UserService from '@services/user'
import PrimaryToggleValue from '../primary-toggle-value'
import MeasureInput from '../measure-input'
import LinearGradient from 'react-native-linear-gradient'

const options: string[] = ['cm', 'in']
const { hex: primaryHex, rgb: primaryRgb } = Colors.primary

export default withPopupBehavior(
   ({ 
      setVisible, 
      onConfirm
   }: { 
      setVisible: Dispatch<SetStateAction<boolean>>, 
      onConfirm: (afterDisappear: () => Promise<void>) => void
   }) => {
      const dispatch = useDispatch()
      const { session, metadata } = useSelector((state: AppState) => state.user)
      const { waistMeasure } = metadata
      const userId: string | null = session && session.user.id || null
      const [ waist, setWaist ] = useState<number>(waistMeasure)

      const onSave = async () => {
         const payload = { waistMeasure: waist }
         if (userId) {
            const errorMessage: string = await UserService.updatePersonalData(userId, payload)
            return
         }
         dispatch(updateMetadata(payload))
         setVisible(false)
      }

      const onChangeOption = (index: number) => {
         if (index === 1) {
            setWaist(centimeterToInch(waist))
            return
         }
         setWaist(inchToCentimeter(waist))
      }

      return (
         <>
            <PrimaryToggleValue {...{ options, onChangeOption }} />
            <MeasureInput 
               contentCentered
               symb='cm' 
               value={waist} 
               onChangeText={t => setWaist(+t)} 
               additionalStyles={styles.input} />
            <TouchableOpacity
               onPress={() => onConfirm(onSave)}
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
   },
   'centered', 
   'Current waist',
   hS(315)
)

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