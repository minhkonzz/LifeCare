import { useState } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { AppStore } from '@store/index'
import { primaryHex, primaryRgb } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { updateMetadata, enqueueAction } from '@store/user'
import { autoId } from '@utils/helpers'
import { NETWORK_REQUEST_FAILED } from '@utils/constants/error-message'
import { commonStyles } from '@utils/stylesheet'
import withSync from '@hocs/withSync'
import withPopupBehavior from '@hocs/withPopupBehavior'
import MeasureInput from '../measure-input'
import LinearGradient from 'react-native-linear-gradient'
import PrimaryToggleValue from '../primary-toggle-value'
import UserService from '@services/user'
import useSession from '@hooks/useSession'

const { popupButton, popupButtonBg, popupButtonText } = commonStyles
const options: string[] = ['kg', 'lb']

export default withPopupBehavior(
   withSync(({ 
      onConfirm,
      isOnline
   }: { 
      onConfirm: (afterDisappear: () => Promise<void>) => void,
      isOnline: boolean
   }) => {
      const dispatch = useDispatch()
      const { goalWeight } = useSelector((state: AppStore) => state.user.metadata)
      const { userId } = useSession()
      const [ weight, setWeight ] = useState<number>(goalWeight)
      const [ selectedOptionIndex, setSelectedOptionIndex ] = useState<number>(0)

      const onSave = async () => {
         const payload = { goalWeight: weight }

         const cache = () => {
            dispatch(updateMetadata(payload))
            if (userId && !isOnline) {
               dispatch(enqueueAction({
                  userId, 
                  actionId: autoId('qaid'),
                  invoker: 'updatePersonalData',
                  name: 'UPDATE_GOAL_WEIGHT',
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

      return (
         <>
            <PrimaryToggleValue {...{ 
               options,
               selectedOptionIndex, 
               setSelectedOptionIndex 
            }} />
            <MeasureInput 
               contentCentered
               symb={options[selectedOptionIndex]}
               value={weight} 
               onChangeText={t => setWeight(+t)} />
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
   'Target weight',
   hS(300)
)