import { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { AppStore } from '@store/index'
import { darkRgb, primaryHex, primaryRgb } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { updateMetadata, enqueueAction } from '@store/user'
import { getCurrentUTCDateV2, getCurrentUTCDatetimeV1 } from '@utils/datetimes'
import { poundsToKilograms, kilogramsToPounds, centimeterToInch, inchToCentimeter } from '@utils/fomular'
import { NETWORK_REQUEST_FAILED } from '@utils/constants/error-message'
import { autoId } from '@utils/helpers'
import { commonStyles } from '@utils/stylesheet'
import withSync from '@hocs/withSync'
import withPopupBehavior from '@hocs/withPopupBehavior'
import PrimaryToggleValue from '../primary-toggle-value'
import MeasureInput from '../measure-input'
import LinearGradient from 'react-native-linear-gradient'
import UserService from '@services/user'
import useSession from '@hooks/useSession'

const { popupButton, popupButtonBg, popupButtonText } = commonStyles
const options: Array<string> = ["cm/kg", "ft/lb"]

export default withPopupBehavior(
   withSync(({ 
      onConfirm,
      isOnline 
   }: { 
      onConfirm: (afterDisappear: () => Promise<void>) => void,
      isOnline: boolean
   }) => {
      const dispatch = useDispatch()
      const { userId } = useSession()
      let { currentHeight, currentWeight, bodyRecords } = useSelector((state: AppStore) => state.user.metadata)
      const [ height, setHeight ] = useState<number>(currentHeight)
      const [ weight, setWeight ] = useState<number>(currentWeight)
      const [ selectedOptionIndex, setSelectedOptionIndex ] = useState<number>(0) 
      const symbSplits = options[selectedOptionIndex].split('/')

      const onSave = async () => {
         const currentDate: string = getCurrentUTCDateV2()
         const newBodyRecId: string = autoId('br')
         const newWeight: number = selectedOptionIndex ? poundsToKilograms(weight) : weight
         const payload = { currentHeight: selectedOptionIndex ? inchToCentimeter(height) : height, currentWeight: newWeight } 
         const reqPayload = { ...payload, newBodyRecId, currentDate }

         const cache = () => {
            dispatch(updateMetadata(payload))
            const i: number = bodyRecords.findIndex((e: any) => {
               const createdAt: Date = new Date(e.createdAt)
               return createdAt.toLocaleDateString() === currentDate && e.type === 'weight'
            })

            if (i === -1) {
               const currentDatetime: string = getCurrentUTCDatetimeV1()
               bodyRecords = [...bodyRecords, {
                  id: newBodyRecId,
                  value: newWeight,
                  type: 'weight',
                  createdAt: currentDatetime,
                  updatedAt: currentDatetime
               }]
            } else bodyRecords[i].value = newWeight

            dispatch(updateMetadata({ bodyRecords }))
            if (userId && !isOnline) {
               dispatch(enqueueAction({
                  userId, 
                  actionId: autoId('qaid'),
                  invoker: 'updateBMI',
                  name: 'UPDATE_BMI',
                  params: [userId, reqPayload]
               }))
            }
         }

         if (userId) {
            const errorMessage: string = await UserService.updateBMI(userId, reqPayload)
            if (errorMessage === NETWORK_REQUEST_FAILED) cache()
            return
         } 
         cache()
      }

      const onChangeOption = () => {
         const [ heightConvertFunc, weightConvertFunc ] = selectedOptionIndex && [ centimeterToInch, kilogramsToPounds ] || [ inchToCentimeter, poundsToKilograms ]
         setHeight(heightConvertFunc(height))
         setWeight(weightConvertFunc(weight))
      }

      return (
         <>
            <PrimaryToggleValue {...{ 
               options, 
               selectedOptionIndex, 
               setSelectedOptionIndex,
               onChangeOption, 
               additionalStyles: styles.toggle 
            }} />
            <View style={styles.input}>
               <Text style={styles.inputTitle}>Height</Text>
               <MeasureInput 
                  contentCentered
                  symb={symbSplits[0]}
                  value={height}
                  onChangeText={t => setHeight(+t)} />
            </View>
            <View style={styles.input}>
               <Text style={styles.inputTitle}>Weight</Text>
               <MeasureInput
                  contentCentered 
                  symb={symbSplits[1]}
                  value={weight} 
                  onChangeText={t => setWeight(+t)} />
            </View>
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
   'Weight & Height',
   hS(315)
)

const styles = StyleSheet.create({
   toggle: { marginVertical: vS(8) },

   input: {
      alignItems: 'center',
      marginVertical: vS(18),
      marginLeft: hS(20)
   },
    
   inputTitle: {
      fontFamily: 'Poppins-Regular', 
      fontSize: hS(14), 
      color: `rgba(${darkRgb.join(', ')}, .8)`, 
      letterSpacing: .2, 
      marginRight: hS(16)
   }
})