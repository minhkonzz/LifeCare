import { memo, useState, Dispatch, SetStateAction, useRef } from 'react'
import { Text, StyleSheet, Animated, TouchableOpacity } from 'react-native'
import { updateStartWaterRemind } from '../../../store/setting'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../../../store'
import Popup from '@components/shared/popup'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import LinearGradient from 'react-native-linear-gradient'
import TimeInput from '@components/time-input'

const Main = ({
   animateValue,
   setVisible
}: {
   animateValue: Animated.Value,
   setVisible: Dispatch<SetStateAction<boolean>>
}) => {
   const { h, m } = useSelector((state: AppState) => state.setting.reminders.startWater)
   const [ hours, setHours ] = useState<number>(h)
   const [ mins, setMins ] = useState<number>(m)
   const dispatch = useDispatch()

   const onSave = () => {
      Animated.timing(animateValue, {
         toValue: 0, 
         duration: 320, 
         useNativeDriver: true
      }).start(() => {
         // missing validate input
         setVisible(false)
         dispatch(updateStartWaterRemind({ h: hours, m: mins }))
      })
   }

   return (
      <>
         <TimeInput {...{ hours, setHours, mins, setMins }} />
         <TouchableOpacity
            onPress={onSave}
            activeOpacity={.7}
            style={styles.button}>
            <LinearGradient
               style={styles.buttonBg}
               colors={['rgba(116, 155, 194, .6)', '#749BC2']}
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
         type: 'centered',
         title: 'Start water reminder', 
         width: hS(315),
         animateValue, 
         setVisible
      }}>
         <Main {...{ animateValue, setVisible }} />
      </Popup>
   )
})

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
   }
})
