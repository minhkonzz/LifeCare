import { useState } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { AppStore } from '@store/index'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { commonStyles } from '@utils/stylesheet'
import { updateCustomCupsize } from '@store/water'
import MeasureInput from '../measure-input'
import withPopupBehavior from '@hocs/withPopupBehavior'
import LinearGradient from 'react-native-linear-gradient'

const { popupButton, popupButtonBg, popupButtonText } = commonStyles

export default withPopupBehavior(({ onConfirm }: { onConfirm: (afterDisappear: () => Promise<void>) => void }) => {
      const dispatch = useDispatch()
      const { customCupsize } = useSelector((state: AppStore) => state.water)
      const [ customValue, setCustomValue ] = useState<number>(customCupsize)

      const onSave = async () => {
         dispatch(updateCustomCupsize(customValue))
      }

      return (
         <>
            <MeasureInput 
               contentCentered
               symb='ml'
               value={customValue || ''} 
               onChangeText={t => setCustomValue(+t)} 
               additionalStyles={styles.input} />
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
   'Custom cupsize', 
   hS(300)
)

const styles = StyleSheet.create({
   input: {
      marginVertical: vS(20), 
      marginLeft: hS(28)
   }
})