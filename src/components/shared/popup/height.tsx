import { useState } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { AppStore } from '@store/index'
import { primaryHex, primaryRgb } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { updateMetadata, enqueueAction } from '@store/user'
import { centimeterToInch, inchToCentimeter } from '@utils/fomular'
import { autoId } from '@utils/helpers'
import { NETWORK_REQUEST_FAILED } from '@utils/constants/error-message'
import { commonStyles } from '@utils/stylesheet'
import withSync from '@hocs/withSync'
import withPopupBehavior from '@hocs/withPopupBehavior'
import PrimaryToggleValue from '../primary-toggle-value'
import MeasureInput from '../measure-input'
import LinearGradient from 'react-native-linear-gradient'
import UserService from '@services/user'
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
      const { metadata } = useSelector((state: AppStore) => state.user)
      const { userId } = useSession()
      const { currentHeight } = metadata
      const [ height, setHeight ] = useState<number>(currentHeight)
      const [ optionIndex, setOptionIndex ] = useState<number>(0)
   
      const onSave = async () => {
         const payload = { currentHeight: height }
         
         const cache = () => {
            dispatch(updateMetadata(payload))
            if (userId && !isOnline) {
               dispatch(enqueueAction({
                  userId,
                  actionId: autoId('qaid'),
                  invoker: 'updatePersonalData',
                  name: 'UPDATE_HEIGHT',
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
         const convertFunc = !index && inchToCentimeter || centimeterToInch
         setHeight(convertFunc(height))
         setOptionIndex(index)
      }
   

      return (
         <>
            <PrimaryToggleValue {...{ options, onChangeOption }} additionalStyles={styles.toggle} />
            <MeasureInput 
               contentCentered
               symb={options[optionIndex]}
               value={height} 
               onChangeText={t => setHeight(+t)} 
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
   'Height', 
   hS(300)
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