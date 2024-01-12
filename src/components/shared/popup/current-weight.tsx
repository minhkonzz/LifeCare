import { useState } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { AppStore } from '@store/index'
import { primaryHex, primaryRgb } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { updateMetadata, enqueueAction } from '@store/user'
import { poundsToKilograms, kilogramsToPounds } from '@utils/fomular'
import { autoId } from '@utils/helpers'
import { NETWORK_REQUEST_FAILED } from '@utils/constants/error-message'
import { commonStyles } from '@utils/stylesheet'
import { getCurrentUTCDateV2 } from '@utils/datetimes'
import withSync from '@hocs/withSync'
import withPopupBehavior from '@hocs/withPopupBehavior'
import PrimaryToggleValue from '../primary-toggle-value'
import MeasureInput from '../measure-input'
import LinearGradient from 'react-native-linear-gradient'
import UserService from '@services/user'
import useSession from '@hooks/useSession'

const { popupButton, popupButtonBg, popupButtonText } = commonStyles
const options = ['kg', 'lb']

export default withPopupBehavior(
   withSync(({ 
      onConfirm,
      isOnline
   }: { 
      onConfirm: (afterDisappear: () => Promise<void>) => void,
      isOnline: boolean
   }) => {
      const dispatch = useDispatch()
      const { metadata } = useSelector((state: AppStore) => state.user)
      const { userId } = useSession()
      const { currentWeight } = metadata
      const [ weight, setWeight ] = useState<number>(currentWeight)
      const [ optionIndex, setOptionIndex ] = useState<number>(0)

      const onSave = async () => {
         const currentDate: string = getCurrentUTCDateV2()
         const newBodyRecId: string = autoId('br')
         const payload = { currentWeight: weight }
         const reqPayload = { ...payload, newBodyRecId, currentDate }
         
         const cache = () => {
            dispatch(updateMetadata(payload))
            if (userId && !isOnline) {
               dispatch(enqueueAction({
                  userId, 
                  actionId: autoId('qaid'),
                  invoker: 'updateWeight',
                  name: 'UPDATE_WEIGHT',
                  params: [userId, reqPayload]
               }))
            }
         }
         
         if (userId) {
            const errorMessage: string = await UserService.updateWeight(userId, reqPayload)
            if (errorMessage === NETWORK_REQUEST_FAILED) cache()
            return
         }
         cache()
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
   'Current weight', 
   hS(315)
)

const styles = StyleSheet.create({
   input: {
      marginLeft: hS(20),
      height: vS(105)
   },

   toggle: {
      marginVertical: vS(8)
   }
})