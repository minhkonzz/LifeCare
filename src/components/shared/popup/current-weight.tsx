import { useState, Dispatch, SetStateAction } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '@store/index'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { updateMetadata, enqueueAction } from '@store/user'
import { poundsToKilograms, kilogramsToPounds } from '@utils/fomular'
import withSync from '@hocs/withSync'
import withPopupBehavior from '@hocs/withPopupBehavior'
import PrimaryToggleValue from '../primary-toggle-value'
import MeasureInput from '../measure-input'
import LinearGradient from 'react-native-linear-gradient'
import UserService from '@services/user'
import { autoId } from '@utils/helpers'
import { NETWORK_REQUEST_FAILED } from '@utils/constants/error-message'

const { hex: primaryHex, rgb: primaryRgb } = Colors.primary
const options = ['kg', 'lb']

export default withPopupBehavior(
   withSync(({ 
      setVisible, 
      onConfirm,
      isOnline
   }: { 
      setVisible: Dispatch<SetStateAction<boolean>>, 
      onConfirm: (afterDisappear: () => Promise<void>) => void,
      isOnline: boolean
   }) => {
      const dispatch = useDispatch()
      const { session, metadata } = useSelector((state: AppState) => state.user)
      const userId: string | null = session && session.user.id || null
      const { currentWeight } = metadata
      const [ weight, setWeight ] = useState<number>(currentWeight)
      const [ optionIndex, setOptionIndex ] = useState<number>(0)

      const onSave = async () => {
         const payload = { currentWeight: weight }
         
         const cache = (beQueued = false) => {
            dispatch(updateMetadata(payload))
            if (beQueued) {
               dispatch(enqueueAction({
                  actionId: autoId('qaid'),
                  invoker: 'updatePersonalData',
                  name: 'UPDATE_WEIGHT',
                  params: [userId, payload]
               }))
            }
         } 

         if (!userId) cache()
         else if (!isOnline) cache(true)
         else {
            const errorMessage: string = await UserService.updatePersonalData(userId, payload)
            if (errorMessage === NETWORK_REQUEST_FAILED) cache(true)
         }
         setVisible(false)
      }

      const onChangeOption = (index: number) => {
         const convertFunc = !index && poundsToKilograms || kilogramsToPounds
         setWeight(convertFunc(weight))
         setOptionIndex(index)
      }

      return (
         <>
            <PrimaryToggleValue {...{ options, onChangeOption, additionalStyles: styles.toggle }} />
            <MeasureInput 
               contentCentered
               symb={options[optionIndex]}
               value={weight} 
               onChangeText={t => setWeight(+t)} 
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
   }),
   'centered',
   'Current weight', 
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
      marginLeft: hS(20),
      height: vS(105)
   },

   toggle: {
      marginVertical: vS(8)
   }
})