import { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { AppStore } from '@store/index'
import { useSelector, useDispatch } from 'react-redux'
import { updateStartFastRemind } from '@store/setting'
import { darkHex, primaryHex, primaryRgb } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import withPopupBehavior from '@hocs/withPopupBehavior'
import LinearGradient from 'react-native-linear-gradient'
import MeasureInput from '../measure-input'
import SettingToggle from '@components/shared/setting-toggle'

export default withPopupBehavior(({ onConfirm }: { onConfirm: (afterDisappear: () => Promise<void>) => void }) => {
      const { beforeStartFast } = useSelector((state: AppStore) => state.setting.reminders)
      const [ enabled, setEnabled ] = useState<boolean>(!beforeStartFast)
      const [ mins, setMins ] = useState<number>(beforeStartFast)
      const dispatch = useDispatch()

      const onSave = async () => {
         dispatch(updateStartFastRemind(enabled ? 0 : mins))
      }

      const onTogglePress = () => {
         setEnabled(!enabled)
      }

      return (
         <>
            <View style={styles.toggleWrapper}>
               <Text style={styles.toggleText}>When time to fast</Text>
               <SettingToggle value={enabled} onPress={onTogglePress} />
            </View>
            { !enabled && 
            <MeasureInput 
               contentCentered
               symb='mins'
               value={mins}
               onChangeText={(t) => setMins(Number(t))} 
               additionalStyles={styles.input}/>
            }
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
   },
   'bottomsheet', 
   'Start fasting redminder'
)

const styles = StyleSheet.create({
   toggleWrapper: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between', 
      alignItems: 'center', 
      marginVertical: vS(16)
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
      marginTop: vS(40), 
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

   input: { marginLeft: hS(36) }
})
