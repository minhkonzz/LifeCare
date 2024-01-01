import { Dispatch, SetStateAction } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { darkRgb, primaryHex, primaryRgb } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { useNavigation } from '@react-navigation/native'
import { MedicalCheckupIcon } from '@assets/icons'
import withPopupBehavior from '@hocs/withPopupBehavior'
import LinearGradient from 'react-native-linear-gradient'

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
               style={styles.button}>
               <LinearGradient
                  style={styles.buttonBg}
                  colors={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]}
                  start={{ x: .5, y: 0 }}
                  end={{ x: .5, y: 1 }}>
                  <Text style={styles.buttonText}>Remembered</Text>
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