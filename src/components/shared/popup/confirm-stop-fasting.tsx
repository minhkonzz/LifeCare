import { Dispatch, SetStateAction } from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { Colors } from '@utils/constants/colors'
import { useSelector } from 'react-redux'
import { AppState } from '@store/index'
import { useNavigation } from '@react-navigation/native'
import withPopupBehavior from '@hocs/withPopupBehavior'
import LinearGradient from 'react-native-linear-gradient'

const { hex: darkHex } = Colors.darkPrimary
const { hex: primaryHex, rgb: primaryRgb } = Colors.primary

export default withPopupBehavior(
   ({ 
      setVisible, 
      onConfirm
   }: { 
      setVisible: Dispatch<SetStateAction<any>>, 
      onConfirm: (afterDisappear: () => Promise<void>) => void
   }) => {
      const navigation = useNavigation<any>()
      const { session } = useSelector((state: AppState) => state.user)

      const onSave = async () => { 
         setVisible(false)
         navigation.navigate('fasting-result') 
      }

      return (
         <>
            <Text style={styles.content}>Are you sure to end fasting?</Text>
            <TouchableOpacity style={styles.button} activeOpacity={.7} onPress={() => onConfirm(onSave)}>
               <LinearGradient 
                  style={styles.buttonBg}
                  colors={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]}
                  start={{ x: .5, y: 0 }}
                  end={{ x: .5, y: 1 }}>
                  <Text style={styles.buttonText}>End fasting now</Text>
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
   button: {
      width: '100%',
      height: vS(82),
      borderRadius: hS(32),
      overflow: 'hidden',
      marginTop: vS(20)
   },

   content: {
      width: hS(220),
      fontFamily: 'Poppins-Regular', 
      fontSize: hS(12), 
      color: darkHex,
      letterSpacing: .2, 
      lineHeight: vS(22),
      textAlign: 'center'
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