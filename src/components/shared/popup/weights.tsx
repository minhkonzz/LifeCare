import { useState, useRef } from 'react'
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { AppStore } from '@store/index'
import { darkRgb, primaryHex, primaryRgb } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { updateMetadata, enqueueAction } from '@store/user'
import { kilogramsToPounds, poundsToKilograms } from '@utils/fomular'
import { autoId } from '@utils/helpers'
import { NETWORK_REQUEST_FAILED } from '@utils/constants/error-message'
import { commonStyles } from '@utils/stylesheet'
import { getCurrentUTCDateV2, getCurrentUTCDatetimeV1 } from '@utils/datetimes'
import withSync from '@hocs/withSync'
import withPopupBehavior from '@hocs/withPopupBehavior'
import PrimaryToggleValue from '../primary-toggle-value'
import MeasureInput from '../measure-input'
import LinearGradient from 'react-native-linear-gradient'
import UserService from '@services/user'
import useSession from '@hooks/useSession'
import useAnimValue from '@hooks/useAnimValue'

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
      const { userId } = useSession()
      const focusAnimateValue = useAnimValue(0)
      let { currentWeight, goalWeight, bodyRecords } = useSelector((state: AppStore) => state.user.metadata)
      const [ weight, setWeight ] = useState<any>(currentWeight)
      const [ selectedOptionIndex, setSelectedOptionIndex ] = useState<number>(0)
      const [ goal, setGoal ] = useState<any>(goalWeight)
      const [ weightError, setWeightError ] = useState<boolean>(false)
      const [ goalError, setGoalError ] = useState<boolean>(false)

      const onSave = async () => {
         if (weightError || goalError) {
            Animated.sequence([
               Animated.timing(focusAnimateValue, {
                  toValue: 1, 
                  duration: 100,
                  useNativeDriver: true
               }),
               Animated.timing(focusAnimateValue, {
                  toValue: 0, 
                  duration: 100,
                  useNativeDriver: true
               })
            ]).start()
            return 
         }

         const currentDate: string = getCurrentUTCDateV2()
         const newBodyRecId: string = autoId('br')
         const newWeight: number = selectedOptionIndex ? poundsToKilograms(weight) : weight
         const payload = { currentWeight: +newWeight, goalWeight: +goal }
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
                  value: +newWeight,
                  type: 'weight',
                  createdAt: currentDatetime,
                  updatedAt: currentDatetime
               }]
            } else bodyRecords[i].value = +newWeight

            if (userId && !isOnline) {
               dispatch(enqueueAction({
                  userId, 
                  actionId: autoId('qaid'),
                  invoker: 'updateWeights',
                  name: 'UPDATE_WEIGHTS',
                  params: [userId, reqPayload]
               }))
            }
         }

         if (userId) {
            const errorMessage: string = await UserService.updateWeights(userId, reqPayload)
            if (errorMessage === NETWORK_REQUEST_FAILED) cache()
            return
         }
         cache()
      }

      const onChangeWeight = (t: string) => {
         const v: number = +t
         const invalid: boolean = !v || v > 1000 
         setWeightError(invalid)
         setWeight(t)
      }

      const onChangeGoal = (t: string) => {
         const v: number = +t
         const invalid: boolean = !v || v > 1000
         setGoalError(invalid)
         setGoal(t)
      }

      const onChangeOption = () => {
         const convertFunc = selectedOptionIndex && kilogramsToPounds || poundsToKilograms
         setWeight(convertFunc(weight))
         setGoal(convertFunc(goal))
      }

      return (
         <>
            <PrimaryToggleValue {...{ 
               options, 
               selectedOptionIndex, 
               setSelectedOptionIndex,
               onChangeOption 
            }} />
            <View style={{...styles.input, marginTop: vS(10) }}>
               {
                  weightError &&
                  <Animated.Text style={{
                     ...styles.inputTitle, 
                     color: 'red',
                     transform: [{ 
                        translateY: focusAnimateValue.interpolate({
                           inputRange: [0, 1], 
                           outputRange: [-10, 0]
                        }) }, {
                        scale: focusAnimateValue.interpolate({
                           inputRange: [0, 1], 
                           outputRange: [1, 1.1]
                        })
                     }] 
                  }}>
                     Invalid current weight
                  </Animated.Text> ||
                  <Text style={styles.inputTitle}>Current weight</Text>
               }
               <MeasureInput 
                  contentCentered
                  symb={options[selectedOptionIndex]}
                  value={weight}
                  isError={weightError}
                  onChangeText={t => onChangeWeight(t)} />
            </View>
            <View style={styles.input}>
               {
                  goalError &&
                  <Animated.Text style={{
                     ...styles.inputTitle, 
                     color: 'red',
                     transform: [{
                        translateY: focusAnimateValue.interpolate({
                           inputRange: [0, 1], 
                           outputRange: [-10, 0]
                        }) }, {
                        scale: focusAnimateValue.interpolate({
                           inputRange: [0, 1], 
                           outputRange: [1, 1.1]
                        })
                     }] 
                  }}>
                     Invalid goal weight
                  t</Animated.Text> ||
                  <Text style={styles.inputTitle}>Goal weight</Text>
               }
               <MeasureInput 
                  contentCentered
                  symb={options[selectedOptionIndex]}
                  value={goal} 
                  isError={goalError}
                  onChangeText={t => onChangeGoal(t)} />
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
   'Weight',
   hS(315)
)

const styles = StyleSheet.create({
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