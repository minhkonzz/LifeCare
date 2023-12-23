import { useState, ReactNode, Dispatch, SetStateAction } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '@store/index'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { updateMetadata, enqueueAction } from '@store/user'
import { getCurrentUTCDateV2 } from '@utils/datetimes'
import { poundsToKilograms, kilogramsToPounds, centimeterToInch, inchToCentimeter } from '@utils/fomular'
import { NETWORK_REQUEST_FAILED } from '@utils/constants/error-message'
import { autoId } from '@utils/helpers'
import withSync from '@hocs/withSync'
import withPopupBehavior from '@hocs/withPopupBehavior'
import PrimaryToggleValue from '../primary-toggle-value'
import MeasureInput from '../measure-input'
import LinearGradient from 'react-native-linear-gradient'
import UserService from '@services/user'

const options: Array<string> = ["cm/kg", "ft/lb"]
const { hex: primaryHex, rgb: primaryRgb } = Colors.primary
const { rgb: darkRgb } = Colors.darkPrimary

export default withPopupBehavior(
   withSync(({ 
      setVisible,
      onConfirm,
      isOnline 
   }: { 
      setVisible: Dispatch<SetStateAction<ReactNode>>,
      onConfirm: (afterDisappear: () => Promise<void>) => void,
      isOnline: boolean
   }) => {
      const dispatch = useDispatch()
      const session = useSelector((state: AppState) => state.user.session) 
      const userId: string | null = session && session.user.id || null
      const { currentHeight, currentWeight, bodyRecords } = useSelector((state: AppState) => state.user.metadata)
      const [ height, setHeight ] = useState<number>(currentHeight)
      const [ weight, setWeight ] = useState<number>(currentWeight)
      const [ optionIndex, setOptionIndex ] = useState<number>(0) 
      const symbSplits = options[optionIndex].split('/')

      const onSave = async () => {
         const payload = { currentHeight: height, currentWeight: weight }
         const currentDate: string = getCurrentUTCDateV2()
         const newBodyRecId: string = autoId('br')

         const cache = (beQueued = false) => {
            dispatch(updateMetadata(payload))
            const i: number = bodyRecords.findIndex((e: any) => {
               const createdAt: Date = new Date(e.createdAt)
               return createdAt.toLocaleDateString() === currentDate
            })

            if (i === -1) {
               const currentDatetime: string = getUTCDatetimeV1()
               bodyRecords.push({
                  id: newBodyRecId,
                  value: weight,
                  type: 'weight',
                  createdAt: currentDatetime,
                  updatedAt: currentDatetime
               })
               
            } else {
               bodyRecords[i].value = weight
            }
            updateMetadata({ bodyRecords })
            if (beQueued) {
               dispatch(enqueueAction({
                  actionId: autoId('qaid'),
                  invoker: UserService.updateBMI,
                  name: 'UPDATE_BMI',
                  params: [userId, { ...payload, newBodyRecId, currentDate }]
               }))
            }
         }

         if (!userId || !isOnline) cache() 
         else {
            const errorMessage: string = await UserService.updateBMI(userId, { ...payload, newBodyRecId, currentDate })
            if (errorMessage === NETWORK_REQUEST_FAILED) cache()
         } 
         setVisible(null)
      }

      const onChangeOption = (index: number) => {
         if (index === 0) {
            setHeight(inchToCentimeter(height))
            setWeight(poundsToKilograms(weight))
         } else {
            setHeight(centimeterToInch(height))
            setWeight(kilogramsToPounds(weight))
         }
         setOptionIndex(index)
      }

      return (
         <>
            <PrimaryToggleValue {...{ options, onChangeOption, additionalStyles: styles.toggle }} />
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
               style={styles.button}>
               <LinearGradient
                  style={styles.buttonBg}
                  colors={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]}
                  start={{ x: .5, y: 0 }}
                  end={{ x: .5, y: 1 }}>
                  <Text style={styles.buttonText}>Save</Text>
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
   button: {
      width: '100%',
      height: vS(82),
      borderRadius: hS(32),
      overflow: 'hidden',
      marginTop: vS(20)
   },

   buttonBg: {
      width: '100%',
      height: '100%',
      justifyContent: 'center', 
      alignItems: 'center'
   }, 

   buttonText: {
      fontFamily: 'Poppins-SemiBold', 
      fontSize: hS(14), 
      color: '#fff', 
      letterSpacing: .2
   },

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