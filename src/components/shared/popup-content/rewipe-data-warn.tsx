import { memo, Dispatch, SetStateAction, useRef } from 'react'
import { Text, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import Popup from '@components/shared/popup'

export default memo(({ setVisible }: { setVisible: Dispatch<SetStateAction<boolean>> }): JSX.Element => {
   const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current

   const onConfirm = () => {
      Animated.timing(animateValue, {
         toValue: 0, 
         duration: 320, 
         useNativeDriver: true
      }).start()
   }

   return (
      <Popup {...{
         type: 'centered',
         title: 'Warning',
         width: hS(264),
         animateValue, 
         setVisible
      }}>
         <Text style={styles.title}>
            Please backup or synchronize your all data before this action because you cannot recover current data after rewipe
         </Text>
         <TouchableOpacity
            style={styles.rewipeButton}
            onPress={onConfirm}
            activeOpacity={.8}>
            <Text style={styles.rewipeButtonText}>Rewipe all data</Text>
         </TouchableOpacity>
      </Popup>  
   )
})

const styles = StyleSheet.create({
   title: {
      fontFamily: 'Poppins-Regular',
      fontSize: hS(12), 
      color: Colors.darkPrimary.hex, 
      letterSpacing: .2
   }, 

   rewipeButton: {
      width: '100%', 
      height: vS(82),
      borderRadius: hS(32),
      backgroundColor: `rgba(234, 84, 85, .24)`,
      justifyContent: 'center', 
      alignItems: 'center', 
      marginTop: vS(20)
   }, 

   rewipeButtonText: {
      fontFamily: 'Poppins-Medium', 
      fontSize: hS(14), 
      color: '#F45555',
      letterSpacing: .2,
      lineHeight: vS(24)
   }
})