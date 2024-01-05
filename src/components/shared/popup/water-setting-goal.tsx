import { useState } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '@store/index'
import { enqueueAction, updateMetadata } from '@store/user'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { milliliterToOunce, ounceToMilliliter } from '@utils/fomular'
import { autoId } from '@utils/helpers'
import { NETWORK_REQUEST_FAILED } from '@utils/constants/error-message'
import { commonStyles } from '@utils/stylesheet'
import UserService from '@services/user'
import MeasureInput from '../measure-input'
import withPopupBehavior from '@hocs/withPopupBehavior'
import withSync from '@hocs/withSync'
import LinearGradient from 'react-native-linear-gradient'
import SettingToggleValue from '../setting-toggle-value'
import useSession from '@hooks/useSession'

const { popupButton, popupButtonBg, popupButtonText } = commonStyles
const symbOptions: [string, string] = ['ML', 'OZ']

export default withPopupBehavior(
   withSync(({ 
      onConfirm, 
      isOnline 
   }: { 
      isOnline: boolean, 
      onConfirm: (afterDisappear: () => Promise<void>) => void 
   }) => {
      const dispatch = useDispatch()
      const { metadata } = useSelector((state: AppState) => state.user)
      const { userId } = useSession()
      const { dailyWater } = metadata
      const [ goal, setGoal ] = useState<number>(dailyWater)
      const [ toggled, setToggled ] = useState<boolean>(false)
      const [ selectedSymbOption, setSelectedSymbOption ] = useState<string>(symbOptions[Number(toggled)])

      const onSave = async () => {
         const payload = { dailyWater: goal }
         
         const cache = () => {
            dispatch(updateMetadata(payload))
            if (userId && !isOnline) {
               dispatch(enqueueAction({
                  userId,
                  actionId: autoId('qaid'),
                  invoker: 'updatePersonalData',
                  name: 'UPDATE_DAILY_WATER',
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

      const onChangeSymb = () => {
         const convertFn = toggled && ounceToMilliliter || milliliterToOunce
         setGoal(convertFn(goal))
         setToggled(!toggled)
         setSelectedSymbOption(symbOptions[Number(!toggled)])
      }

      return (
         <>
            <SettingToggleValue value={symbOptions} onPress={onChangeSymb} w={hS(180)} />
            <MeasureInput 
               contentCentered
               symb={selectedSymbOption}
               value={goal} 
               onChangeText={t => setGoal(+t)} 
               additionalStyles={styles.input} />
            <TouchableOpacity
               onPress={() => onConfirm(onSave)}
               activeOpacity={.7}
               style={popupButton}>
               <LinearGradient
                  style={popupButtonBg}
                  colors={['rgba(116, 155, 194, .6)', '#749BC2']}
                  start={{ x: .5, y: 0 }}
                  end={{ x: .5, y: 1 }}>
                  <Text style={popupButtonText}>Save</Text>
               </LinearGradient>
            </TouchableOpacity>
         </>
      )
   }),
   'centered', 
   'Goal', 
   hS(300)
)

const styles = StyleSheet.create({
   input: {
      marginVertical: vS(20), 
      marginLeft: hS(28)
   }
})