import { useState } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { primaryHex, primaryRgb } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { useSelector, useDispatch } from 'react-redux'
import { updateMetadata, enqueueAction } from '@store/user'
import { AppStore } from '@store/index'
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
import { getCurrentUTCDateV2, getCurrentUTCDatetimeV1 } from '@utils/datetimes'

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
      let { chestMeasure, bodyRecords } = useSelector((state: AppStore) => state.user.metadata)
      const [ chest, setChest ] = useState<number>(chestMeasure)
      const [ selectedOptionIndex, setSelectedOptionIndex ] = useState<number>(0)
      const { userId } = useSession()

      const onSave = async () => {
         const currentDate: string = getCurrentUTCDateV2()
         const newBodyRecId: string = autoId('br')
         const value = selectedOptionIndex ? inchToCentimeter(chest) : chest
         const payload = { chestMeasure: value }
         const reqPayload = { value, type: 'chest', currentDate, newBodyRecId }

         const cache = () => {
            dispatch(updateMetadata(payload))

            const i: number = bodyRecords.findIndex((e: any) => {
               const createdAt: Date = new Date(e.createdAt)
               return createdAt.toLocaleDateString() === currentDate && e.type === 'chest'
            })

            if (i === -1) {
               const currentDatetime: string = getCurrentUTCDatetimeV1()
               bodyRecords = [...bodyRecords, {
                  id: newBodyRecId,
                  value,
                  type: 'chest',
                  createdAt: currentDatetime,
                  updatedAt: currentDatetime
               }]
            } else bodyRecords[i].value = value

            dispatch(updateMetadata({ bodyRecords }))
            if (userId && !isOnline) {
               dispatch(enqueueAction({
                  userId,
                  actionId: autoId('qaid'),
                  invoker: 'updateBodyRec',
                  name: 'UPDATE_CHEST',
                  params: [userId, reqPayload]
               }))
            }
         }

         if (userId) {
            const errorMessage: string = await UserService.updateBodyRec(userId, reqPayload)
            if (errorMessage === NETWORK_REQUEST_FAILED) cache()
            return
         }
         cache()
      }
   
      const onChangeOption = () => {
         const convertFunc = selectedOptionIndex && centimeterToInch || inchToCentimeter
         setChest(convertFunc(chest))
      }

      return (
         <>
            <PrimaryToggleValue {...{ 
               options,
               onChangeOption, 
               selectedOptionIndex, 
               setSelectedOptionIndex
            }} />
            <MeasureInput 
               contentCentered
               symb={options[selectedOptionIndex]}
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