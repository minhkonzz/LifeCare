import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { darkHex, primaryHex, primaryRgb } from '@utils/constants/colors'
import { commonStyles } from '@utils/stylesheet'
import { useNavigation } from '@react-navigation/native'
import withPopupBehavior from '@hocs/withPopupBehavior'
import LinearGradient from 'react-native-linear-gradient'

const { popupButton, popupButtonBg, popupButtonText } = commonStyles

export default withPopupBehavior(({ onConfirm }: { onConfirm: (afterDisappear: () => Promise<void>) => void }) => {
      const navigation = useNavigation<any>()
      
      const onSave = async () => { 
         navigation.navigate('fasting-result') 
      }

      return (
         <>
            <Text style={styles.content}>You must end fasting period of current fasting plan before changing plan</Text>
            <TouchableOpacity style={popupButton} activeOpacity={.7} onPress={() => onConfirm(onSave)}>
               <LinearGradient 
                  style={popupButtonBg}
                  colors={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]}
                  start={{ x: .5, y: 0 }}
                  end={{ x: .5, y: 1 }}>
                  <Text style={popupButtonText}>End fasting now</Text>
               </LinearGradient>
            </TouchableOpacity>
         </>
      )
   },
   'centered',
   'Confirm',
   hS(300)
)

const styles = StyleSheet.create({
   content: {
      width: hS(220),
      fontFamily: 'Poppins-Regular', 
      fontSize: hS(12), 
      color: darkHex,
      letterSpacing: .2, 
      lineHeight: vS(22),
      textAlign: 'center'
   }
})