import { memo, useState, Dispatch, SetStateAction, useRef } from 'react'
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native'
import Popup from '@components/shared/popup'
import { updateEndFastRemind } from '../../../store/setting'
import { AppState } from '../../../store'
import { useSelector, useDispatch } from 'react-redux'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import LinearGradient from 'react-native-linear-gradient'
import MeasureInput from '../measure-input'
import SettingToggle from '@components/shared/setting-toggle'

const { hex: darkHex } = Colors.darkPrimary
const { hex: primaryHex, rgb: primaryRgb } = Colors.primary

const Main = ({
   animateValue,
   setVisible
}: {
   animateValue: Animated.Value,
   setVisible: Dispatch<SetStateAction<boolean>>
}) => {
   const beforeEndFast = useSelector((state: AppState) => state.setting.reminders.beforeEndFast)
   const [ enabled, setEnabled ] = useState<boolean>(!beforeEndFast)
   const [ mins, setMins ] = useState<number>(beforeEndFast)
   const dispatch = useDispatch()

   const onSave = () => {
      Animated.timing(animateValue, {
         toValue: 0, 
         duration: 320, 
         useNativeDriver: true
      }).start(({ finished }) => {
         setVisible(false)
         if (enabled) {
            dispatch(updateEndFastRemind(0))
            return
         }
         dispatch(updateEndFastRemind(mins))
      })
   }

   const onTogglePress = () => {
      setEnabled(!enabled)
   }

   return (
      <>
         <View style={styles.toggleWrapper}>
            <Text style={styles.toggleText}>When time to end fast</Text>
            <SettingToggle value={enabled} onPress={onTogglePress} />
         </View>
         { enabled && 
         <MeasureInput 
            contentCentered
            symb='mins' 
            value={mins} 
            onChangeText={t => setMins(Number(t))} />
         }
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
         title: 'End fasting reminder', 
         animateValue, 
         setVisible
      }}>
         <Main {...{ animateValue, setVisible }} />
      </Popup>
   )
})

const styles = StyleSheet.create({
   toggleWrapper: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between', 
      alignItems: 'center'
   },

   toggleText: {
      fontFamily: 'Poppins-Medium',
      fontSize: hS(14),
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
