import { Dispatch, SetStateAction } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { darkRgb, primaryHex, primaryRgb } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { useNavigation } from '@react-navigation/native'
import { MedicalCheckupIcon } from '@assets/icons'
import { commonStyles } from '@utils/stylesheet'
import withPopupBehavior from '@hocs/withPopupBehavior'
import LinearGradient from 'react-native-linear-gradient'

const { popupButton, popupButtonBg, popupButtonText } = commonStyles

export default withPopupBehavior(
   ({ setVisible }: { setVisible: Dispatch<SetStateAction<any>> }) => {
      const navigation = useNavigation<any>()
      return (
         <>
            <Text style={styles.text}>
               For people with special physical conditions or taking special medications, 
               please consult physician or other qualified healthcare providers before starting
               this or any other exercise programs
            </Text>
            <MedicalCheckupIcon width={hS(120)} height={vS(120)} />
            <TouchableOpacity
               onPress={() => {
                  setVisible(null)
                  navigation.navigate('survey-loading')
               }}
               activeOpacity={.7}
               style={popupButton}>
               <LinearGradient
                  style={popupButtonBg}
                  colors={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]}
                  start={{ x: .5, y: 0 }}
                  end={{ x: .5, y: 1 }}>
                  <Text style={popupButtonText}>Remembered</Text>
               </LinearGradient>
            </TouchableOpacity>
         </>
      )
   },
   'bottomsheet', 
   'Consult doctor is necessary'
)

const styles = StyleSheet.create({
   text: {
      fontFamily: 'Poppins-Regular',
      fontSize: hS(13),
      color: `rgba(${darkRgb.join(', ')}, .7)`,
      letterSpacing: .2,
      lineHeight: vS(24),
      marginBottom: vS(24)
   }
})