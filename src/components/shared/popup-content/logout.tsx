import { memo, Dispatch, SetStateAction, useRef } from 'react'
import { Text, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import Popup from '../popup'
import UserService from '@services/user'

export default memo(({ setVisible }: { setVisible: Dispatch<SetStateAction<any>> }): JSX.Element => {
   const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current

   const onSignOut = () => {
      Animated.timing(animateValue, {
         toValue: 0, 
         duration: 320, 
         useNativeDriver: true
      }).start(async ({ finished }) => {
         await UserService.signOut()
         setVisible(null)
      })
   }

   return (
      <Popup {...{
         type: 'centered',
         title: 'Logout',
         width: hS(300),
         animateValue,
         setVisible
      }}>
         <Text style={styles.title}>Are you sure want to logout this account</Text>
         <TouchableOpacity
            style={styles.logoutButton}
            activeOpacity={.8}
            onPress={onSignOut}>
            <Text style={styles.logoutButtonText}>Logout</Text>
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

   logoutButton: {
      width: hS(259), 
      height: vS(82),
      borderRadius: hS(32),
      backgroundColor: `rgba(234, 84, 85, .24)`,
      justifyContent: 'center', 
      alignItems: 'center', 
      marginTop: vS(20)
   }, 

   logoutButtonText: {
      fontFamily: 'Poppins-Medium', 
      fontSize: hS(14), 
      color: '#F45555',
      letterSpacing: .2,
      lineHeight: vS(22)
   }
})