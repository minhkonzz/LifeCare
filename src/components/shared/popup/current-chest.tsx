import { useState } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { primaryHex, primaryRgb } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { useSelector, useDispatch } from 'react-redux'
import { updateMetadata, enqueueAction } from '@store/user'
import { AppState } from '@store/index'
import { inchToCentimeter, centimeterToInch } from '@utils/fomular'
import { autoId } from '@utils/helpers'
import { NETWORK_REQUEST_FAILED } from '@utils/constants/error-message'
import { commonStyles } from '@utils/stylesheet'
import UserService from '@services/user'
import PrimaryToggleValue from '../primary-toggle-value'
import MeasureInput from '../measure-input'
import LinearGradient from 'react-native-linear-gradient'
import withSync from '@hocs/withSync'
import withPopupBehavior from '@hocs/withPopupBehavior'
import useSession from '@hooks/useSession'

const { popupButton, popupButtonBg, popupButtonText } = commonStyles
const options: string[] = ['cm', 'in']

export default withPopupBehavior(
   withSync(({ 
      onConfirm,
      isOnline
   }: {  
      onConfirm: (afterDisappear: () => Promise<void>) => void, 
      isOnline: boolean
   }) => {
      const dispatch = useDispatch()
      const { metadata } = useSelector((state: AppState) => state.user)
      const { chestMeasure } = metadata
      const [ chest, setChest ] = useState<number>(chestMeasure)
      const { userId } = useSession()

      const onSave = async () => {
         const payload = { chestMeasure }

         const cache = () => {
            dispatch(updateMetadata(payload))
            if (userId && !isOnline) {
               dispatch(enqueueAction({
                  userId,
                  actionId: autoId('qaid'),
                  name: 'UPDATE_CHEST',
                  invoker: UserService.updatePersonalData,
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
            setChest(inchToCentimeter(chest))
            return
         }
         setChest(centimeterToInch(chest))
      }

      return (
         <>
            <PrimaryToggleValue {...{ options, onChangeOption }} />
            <MeasureInput 
               contentCentered
               symb='cm' 
               value={chest} 
               onChangeText={t => setChest(+t)} 
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
   'Current chest', 
   hS(315)
)

const styles = StyleSheet.create({
   input: { 
      marginTop: vS(22), 
      marginLeft: hS(28) 
   }
})