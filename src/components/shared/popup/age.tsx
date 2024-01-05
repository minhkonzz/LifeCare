import { useState } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { primaryHex, primaryRgb } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '@store/index'
import { enqueueAction, updateMetadata } from '@store/user'
import { commonStyles } from '@utils/stylesheet'
import { autoId } from '@utils/helpers'
import { NETWORK_REQUEST_FAILED } from '@utils/constants/error-message'
import withSync from '@hocs/withSync'
import withPopupBehavior from '@hocs/withPopupBehavior'
import LinearGradient from 'react-native-linear-gradient'
import WheelPicker from '../wheel-picker'
import UserService from '@services/user'
import useSession from '@hooks/useSession'

const { popupButton, popupButtonBg, popupButtonText } = commonStyles
const ages: Array<number> = Array.from({ length: 120 }, (_, i) => i + 1)

export default withPopupBehavior(
   withSync(({ 
      isOnline,
      onConfirm 
   }: { 
      isOnline: boolean,
      onConfirm: (afterDisappear: () => Promise<void>) => void
   }) => {
      const dispatch = useDispatch()
      const { metadata } = useSelector((state: AppState) => state.user)
      const { age } = metadata
      const [ currentAge, setCurrentAge ] = useState<number>(age)
      const { userId } = useSession()
      const currentAgeIndex: number = ages.findIndex(e => e === currentAge)

      const onSave = async () => {                  
         const payload = { age: currentAge }

         const cache = () => {
            dispatch(updateMetadata(payload))
            if (userId && !isOnline) {
               dispatch(enqueueAction({
                  userId,
                  actionId: autoId('qaid'),
                  invoker: 'updatePersonalData',
                  name: 'UPDATE_AGE',
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

      const onChangeAge = (index: number) => {
         setCurrentAge(ages[index])
      }

      return (
         <>
            <WheelPicker 
            items={ages} 
            itemHeight={vS(72)} 
            onIndexChange={onChangeAge} 
            initialScrollIndex={currentAgeIndex} />
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
   'Age',
   hS(332)
)