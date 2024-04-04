import { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { updateEndFastRemind } from '@store/setting'
import { AppStore } from '@store/index'
import { useSelector, useDispatch } from 'react-redux'
import { darkHex, primaryHex, primaryRgb } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { commonStyles } from '@utils/stylesheet' 
import withPopupBehavior from '@hocs/withPopupBehavior'
import LinearGradient from 'react-native-linear-gradient'
import MeasureInput from '../measure-input'
import SettingToggle from '@components/shared/setting-toggle'

const { popupButton, popupButtonBg, popupButtonText } = commonStyles

export default withPopupBehavior(({ onConfirm }: { onConfirm: (afterDisappear: () => Promise<void>) => void }) => {
      const beforeEndFast = useSelector((state: AppStore) => state.setting.reminders.beforeEndFast)
      const [ enabled, setEnabled ] = useState<boolean>(!beforeEndFast)
      const [ mins, setMins ] = useState<number>(beforeEndFast)
      const dispatch = useDispatch()

      const onSave = async () => {
         dispatch(updateEndFastRemind(enabled ? 0 : mins))
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
            { !enabled && 
            <MeasureInput 
               contentCentered
               symb='mins' 
               value={mins} 
               onChangeText={t => setMins(Number(t))} />
            }
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
   },
   'bottomsheet', 
   'End fasting reminder'
)

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
   }
})
