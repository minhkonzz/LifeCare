import { useState, Dispatch, SetStateAction } from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { updateWaterInterval } from '@store/setting'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { AppState } from '@store/index'
import { useDispatch, useSelector } from 'react-redux'
import withPopupBehavior from '@hocs/withPopupBehavior'
import LinearGradient from 'react-native-linear-gradient'
import TimeInput from '@components/time-input'

export default withPopupBehavior(
   ({ 
      setVisible,
      onConfirm
   }: { 
      setVisible: Dispatch<SetStateAction<any>>, 
      onConfirm: (afterDisappear: () => Promise<void>) => void
   }) => {
      const { h, m } = useSelector((state: AppState) => state.setting.reminders.waterInterval)
      const [ hours, setHours ] = useState<number>(h)
      const [ mins, setMins ] = useState<number>(m)
      const dispatch = useDispatch()

      const onSave = async () => {
         setVisible(false)
         dispatch(updateWaterInterval({ h: hours, m: mins }))
      }

      return (
         <>
            <TimeInput {...{ hours, setHours, mins, setMins }} />
            <TouchableOpacity
               onPress={() => onConfirm(onSave)}
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
   },
   'centered', 
   'Water reminder interval', 
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
   }
})
