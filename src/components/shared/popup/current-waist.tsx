import { useState, Dispatch, SetStateAction } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { primaryHex, primaryRgb } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { useSelector, useDispatch } from 'react-redux'
import { AppStore } from '@store/index'
import { updateMetadata, enqueueAction } from '@store/user'
import { inchToCentimeter, centimeterToInch } from '@utils/fomular'
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
      let { waistMeasure, bodyRecords } = useSelector((state: AppStore) => state.user.metadata)
      const { userId } = useSession()
      const [ waist, setWaist ] = useState<number>(waistMeasure)
      const [ selectedOptionIndex, setSelectedOptionIndex ] = useState<number>(0)

      const onSave = async () => {
         const currentDate: string = getCurrentUTCDateV2()
         const newBodyRecId: string = autoId('br')
         const value = selectedOptionIndex ? inchToCentimeter(waist) : waist
         const payload = { waistMeasure: value }
         const reqPayload = { value, type: 'waist', currentDate, newBodyRecId }

         const cache = () => {
            dispatch(updateMetadata(payload))

            const i: number = bodyRecords.findIndex((e: any) => {
               const createdAt: Date = new Date(e.createdAt)
               return createdAt.toLocaleDateString() === currentDate && e.type === 'waist'
            })

            if (i === -1) {
               const currentDatetime: string = getCurrentUTCDatetimeV1()
               bodyRecords = [...bodyRecords, {
                  id: newBodyRecId,
                  value,
                  type: 'waist',
                  createdAt: currentDatetime,
                  updatedAt: currentDatetime
               }]
            } else bodyRecords[i].value = value

            if (userId && !isOnline) {
               dispatch(enqueueAction({
                  userId, 
                  actionId: autoId('qaid'),
                  invoker: 'updateBodyRec',
                  name: 'UPDATE_WAIST',
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
         if (selectedOptionIndex === 1) {
            setWaist(centimeterToInch(waist))
            return
         }
         setWaist(inchToCentimeter(waist))
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
               symb='cm' 
               value={waist} 
               onChangeText={t => setWaist(+t)} 
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
   'Current waist',
   hS(315)
)

const styles = StyleSheet.create({

   input: { 
      marginTop: vS(22), 
      marginLeft: hS(28) 
   }
})