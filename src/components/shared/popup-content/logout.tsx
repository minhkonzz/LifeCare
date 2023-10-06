import {
   Text,
   TouchableOpacity, 
   StyleSheet
} from 'react-native'

import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'

export default (): JSX.Element => {
   return (
      <>
         <Text style={styles.title}>Are you sure want to logout this account</Text>
         <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => {}}
            activeOpacity={.8}>
            <Text style={styles.logoutButtonText}>Logout</Text>
         </TouchableOpacity>
      </>   
   )
}

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