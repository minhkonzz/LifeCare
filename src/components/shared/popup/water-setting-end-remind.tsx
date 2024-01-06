import { useState } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { updateEndWaterRemind } from '@store/setting'
import { useSelector, useDispatch } from 'react-redux'
import { AppStore } from '@store/index'
import { horizontalScale as hS } from '@utils/responsive'
import { commonStyles } from '@utils/stylesheet'
import LinearGradient from 'react-native-linear-gradient'
import TimeInput from '@components/time-input'
import withPopupBehavior from '@hocs/withPopupBehavior'

const { popupButton, popupButtonBg, popupButtonText } = commonStyles

export default withPopupBehavior(
   ({ 
      onConfirm
   }: { 
      onConfirm: (afterDisappear: () => Promise<void>) => void
   }) => {
      const { h, m } = useSelector((state: AppStore) => state.setting.reminders.endWater)
      const [ hours, setHours ] = useState<number>(h)
      const [ mins, setMins ] = useState<number>(m)
      const dispatch = useDispatch()

      const onSave = async () => {
         dispatch(updateEndWaterRemind({ h: hours, m: mins }))
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
                  colors={['rgba(116, 155, 194, .6)', '#749BC2']}
                  start={{ x: .5, y: 0 }}
                  end={{ x: .5, y: 1 }}>
                  <Text style={popupButtonText}>Save</Text>
               </LinearGradient>
            </TouchableOpacity>
         </>
      )
   }, 
   'centered', 
   'End water reminder',
   hS(315)
)
