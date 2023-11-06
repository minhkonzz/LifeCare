import { memo, useState, Dispatch, SetStateAction, useRef } from 'react'
import { AppState } from '../../../store'
import { useSelector, useDispatch } from 'react-redux'
import { updateWeightRemind } from '../../../store/setting'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { View, Text, StyleSheet, TouchableOpacity, Animated, Pressable } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Popup from '../popup'
import TimeInput from '@components/time-input'

const { hex: primaryHex, rgb: primaryRgb } = Colors.primary 
const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary

const Main = ({ 
   animateValue, 
   setVisible 
}: {
   animateValue: Animated.Value,
   setVisible: Dispatch<SetStateAction<boolean>>
}) => {
   const repeatWeight = useSelector((state: AppState) => state.setting.reminders.repeatWeight)
   const { days, h, m } = repeatWeight
   const [ hours, setHours ] = useState<number>(h)
   const [ mins, setMins ] = useState<number>(m)
   const dispatch = useDispatch()

   const onSave = () => {
      Animated.timing(animateValue, {
         toValue: 0,
         duration: 320, 
         useNativeDriver: true
      }).start(({ finished }) => {
         // missing validate input
         setVisible(false)
         dispatch(updateWeightRemind({ days, h: hours, m: mins }))
      })
   }

   const onSelectDay = (day: string) => {
      if (days.includes(day)) {
         const newDays = days.filter(e => e !== day)
         dispatch(updateWeightRemind({ days: newDays, h, m }))
         return
      }
      const newDays = days.push(day)
      dispatch(updateWeightRemind({ days: newDays, h, m }))
   }

   return (
      <>
         <View style={styles.days}>
         {
            ['Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat']
            .map((e, i) => 
               <Pressable key={i} onPress={() => onSelectDay(e)}>
               {
                  days.includes(e) && 
                  <LinearGradient
                     style={styles.day}
                     colors={[`rgba(${primaryRgb.join(', ')}, .2)`, primaryHex]}
                     start={{ x: .5, y: 0 }}
                     end={{ x: .52, y: .5 }}>
                     <Text style={{...styles.dayText, color: '#fff'}}>{e}</Text>
                  </LinearGradient> || 
                  <View style={styles.day}>
                     <Text style={styles.dayText}>{e}</Text>
                  </View>
               }
               </Pressable>
            )
         }
         </View>
         <TimeInput {...{ hours, setHours, mins, setMins }} />
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

export default memo(({ setVisible }: { setVisible: Dispatch<SetStateAction<boolean>> }): JSX.Element => {
   const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current

   return (
      <Popup {...{
         type: 'bottomsheet',
         title: 'Repeat current weight',
         animateValue,
         setVisible
      }}>
         <Main {...{ animateValue, setVisible }} />
      </Popup>
   )
})

const styles = StyleSheet.create({
   hrz: {
      flexDirection: 'row',
      alignItems: 'center'
   },

   days: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
   },

   day: {
      width: hS(45), 
      height: vS(45), 
      justifyContent: 'center', 
      alignItems: 'center',
      borderRadius: 500,
      backgroundColor: `rgba(${darkRgb.join(', ')}, .12)`
   },

   dayText: {
      fontFamily: 'Poppins-Regular', 
      fontSize: hS(11),
      color: darkHex,
      letterSpacing: .2
   },

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
   }
})