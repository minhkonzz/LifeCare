import { useState } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { updateStartWaterRemind } from '@store/setting'
import { useSelector, useDispatch } from 'react-redux'
import { AppStore } from '@store/index'
import { primaryHex, primaryRgb } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { commonStyles } from '@utils/stylesheet'
import withPopupBehavior from '@hocs/withPopupBehavior'
import LinearGradient from 'react-native-linear-gradient'
import TimeInput from '@components/time-input'

const { popupButton, popupButtonBg, popupButtonText } = commonStyles

export default withPopupBehavior(
   ({ 
      onConfirm
   }: { 
      onConfirm: (afterDisappear: () => Promise<void>) => void
   }) => {
      const { h, m } = useSelector((state: AppStore) => state.setting.reminders.startWater)
      const [ hours, setHours ] = useState<number>(h)
      const [ mins, setMins ] = useState<number>(m)
      const dispatch = useDispatch()

      const onSave = async () => {
         dispatch(updateStartWaterRemind({ h: hours, m: mins }))
      }

      return (
         <>
            <TimeInput {...{ hours, setHours, mins, setMins }} />
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
   'centered', 
   'Start water reminder', 
   hS(315)
)
