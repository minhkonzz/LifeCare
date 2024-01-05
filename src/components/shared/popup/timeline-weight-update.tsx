import { memo, Dispatch, useState, useRef, SetStateAction } from 'react'
import { Text, TouchableOpacity, Animated, StyleSheet } from 'react-native'
import { darkHex, darkRgb, primaryHex, primaryRgb } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { updateMetadata } from '@store/user'
import { poundsToKilograms, kilogramsToPounds } from '@utils/fomular'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '@store/index'
import { getMonthTitle } from '@utils/datetimes'
import PrimaryToggleValue from '../primary-toggle-value'
import MeasureInput from '../measure-input'
import Popup from '@components/shared/popup'
import LinearGradient from 'react-native-linear-gradient'
import UserService from '@services/user'
import useSession from '@hooks/useSession'

const options: Array<string> = ["kg", "lb"]

const Main = ({ 
   animateValue,
   timelineTimeRecord
}: {
   animateValue: Animated.Value,
   timelineTimeRecord: any
}) => {

   const dispatch = useDispatch()
   const focusAnimateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current
   const { bodyRecords } = useSelector((state: AppState) => state.user.metadata)
   const { userId } = useSession()
   const { id, value, day, date, month } = timelineTimeRecord
   const [ weight, setWeight ] = useState<any>(value)
   const [ weightError, setWeightError ] = useState<boolean>(false)

   const onSave = () => {
      if (weightError) {
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

      Animated.timing(animateValue, {
         toValue: 0,
         duration: 320,
         useNativeDriver: true
      }).start(async () => {
         const payload = { id, value: +weight }
         if (userId) {
            const errorMessage: string = await UserService.updateWeightTimeline(userId, payload)
            return
         }
         const r = bodyRecords.find((e: any) => e.id === id)
         r['value'] = value
         dispatch(updateMetadata({ bodyRecords }))
      })
   }

   const onChangeOption = (index: number) => {
      const convertedWeight = !index && poundsToKilograms(+weight) || kilogramsToPounds(+weight)
      setWeight(convertedWeight)
   }

   const onChangeWeight = (t: string) => {
      const v: number = +t
      const invalid: boolean = !v || v > 1000 
      setWeightError(invalid)
      setWeight(t)
   }

   return (
      <>
         <Text style={styles.datetimeText}>{`${day}, ${getMonthTitle(month, true)} ${date}`}</Text>
         <PrimaryToggleValue {...{ options, onChangeOption, additionalStyles: styles.primaryToggleValue }} />
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
            </Animated.Text> 
         }
         <MeasureInput 
            contentCentered
            symb='kg' 
            value={weight}
            isError={weightError}
            onChangeText={t => onChangeWeight(t)} />

         <TouchableOpacity
            onPress={onSave}
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
}

export default memo(({
   setVisible,
   timelineTimeRecord
}: { 
   setVisible: Dispatch<SetStateAction<any>>,
   timelineTimeRecord: any
}) => {
   const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current

   return (
      <Popup {...{
         type: 'centered',
         width: hS(315), 
         title: 'Weight',
         animateValue,
         setVisible
      }}>
         <Main {...{ animateValue, setVisible, timelineTimeRecord }} />
      </Popup>
   )
})

const styles = StyleSheet.create({
   datetimeText: {
      fontFamily: 'Poppins-Regular',
      fontSize: hS(13),
      color: darkHex,
      letterSpacing: .2,
      marginBottom: vS(16)
   },

   primaryToggleValue: {
      marginBottom: vS(24)
   },

   button: {
      width: '100%',
      height: vS(82),
      borderRadius: hS(32),
      overflow: 'hidden',
      marginTop: vS(36)
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

   input: {
      alignItems: 'center',
      marginVertical: vS(18),
      marginLeft: hS(20),
      marginTop: vS(32)
   },
    
   inputTitle: {
      fontFamily: 'Poppins-Regular', 
      fontSize: hS(14), 
      color: `rgba(${darkRgb.join(', ')}, .8)`, 
      letterSpacing: .2, 
      marginRight: hS(16)
   }
})