import { useState, Dispatch, SetStateAction } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { primaryHex, primaryRgb } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '@store/index'
import { updateMetadata, enqueueAction } from '@store/user'
import { centimeterToInch, inchToCentimeter } from '@utils/fomular'
import { autoId } from '@utils/helpers'
import { NETWORK_REQUEST_FAILED } from '@utils/constants/error-message'
import { commonStyles } from '@utils/stylesheet'
import withSync from '@hocs/withSync'
import withPopupBehavior from '@hocs/withPopupBehavior'
import UserService from '@services/user'
import PrimaryToggleValue from '../primary-toggle-value'
import MeasureInput from '../measure-input'
import LinearGradient from 'react-native-linear-gradient'
import useSession from '@hooks/useSession'

const { popupButton, popupButtonBg, popupButtonText } = commonStyles
const options: string[] = ['cm', 'in']

export default withPopupBehavior(
   withSync(({  
      onConfirm,
      isOnline
   }: { 
      setVisible: Dispatch<SetStateAction<boolean>>,
      onConfirm: (afterDisappear: () => Promise<void>) => void,
      isOnline: boolean
   }) => {
      const dispatch = useDispatch()
      const { metadata } = useSelector((state: AppState) => state.user)
      const { hipsMeasure } = metadata
      const [ hips, setHips ] = useState<number>(hipsMeasure)
      const { userId } = useSession()

      const onSave = async () => {
         const payload = { hipsMeasure }

         const cache = async () => {
            dispatch(updateMetadata(payload))
            if (userId && !isOnline) {
               dispatch(enqueueAction({
                  userId,
                  actionId: autoId('qaid'),
                  invoker: 'updatePersonalData',
                  name: 'UPDATE_HIPS',
                  params: [userId, payload]
               }))
            }
         }

         if (userId) {
            const errorMessage: string = await UserService.updatePersonalData(userId, payload)
            if (errorMessage === NETWORK_REQUEST_FAILED) cache()
            return
         }
         cache()
      }

      const onChangeOption = (index: number) => {
         if (index === 0) {
            setHips(inchToCentimeter(hips))
            return
         }
         setHips(centimeterToInch(hips))
      }

      return (
         <>
            <PrimaryToggleValue {...{ options, onChangeOption }} />
            <MeasureInput 
               contentCentered
               symb='cm' 
               value={hips} 
               onChangeText={t => setHips(+t)} 
               additionalStyles={styles.input} />
            <TouchableOpacity
               onPress={() => onConfirm(onSave)}
               activeOpacity={.7}
               style={popupButton}>
               <LinearGradient
                  style={popupButtonBg}
                  colors={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]}
                  start={{ x: .5, y: 0 }}
                  end={{ x: .5, y: 1 }}>
                  <Text style={popupButtonText}>Save</Text>
               </LinearGradient>
            </TouchableOpacity>
         </>
      )
   }),
   'centered', 
   'Current hips', 
   hS(315)
)

const styles = StyleSheet.create({
   input: { 
      marginTop: vS(22), 
      marginLeft: hS(28) 
   }
})