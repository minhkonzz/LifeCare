import {
   View, 
   Text, 
   Image, 
   StyleSheet, 
   TouchableOpacity
} from 'react-native'

import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import CloudBackupSvg from '@assets/icons/cloud-backup.svg'
import LinearGradient from 'react-native-linear-gradient'

const darkPrimary: string = Colors.darkPrimary.hex

export default (): JSX.Element => {
   return (
      <LinearGradient 
         style={styles.container}
         colors={[`rgba(${Colors.darkPrimary.rgb.join(', ')}, .6)`, Colors.darkPrimary.hex]}
         start={{ x: .5, y: 0 }}
         end={{ x: .52, y: .5 }}>
         <View>
            <Text style={styles.title}>Backup & Restore</Text>
            <Text style={styles.desc}>Sign in and synchronize your data</Text>
            <TouchableOpacity style={styles.syncDataButton} onPress={() => {}} activeOpacity={.8}>
               <Text style={styles.syncDataButtonText}>SYNC DATA</Text>
            </TouchableOpacity>
         </View>
         <CloudBackupSvg style={styles.cloudSvg} width={hS(92)} height={vS(92)} />
      </LinearGradient>
   )
}

const styles = StyleSheet.create({
   container: {
      width: hS(370),
      height: vS(160),
      flexDirection: 'row', 
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginTop: vS(24), // delete
      borderRadius: hS(24),
      paddingHorizontal: hS(16), 
      paddingVertical: vS(16),
      elevation: 5, 
      shadowColor: darkPrimary
   }, 

   title: {
      fontFamily: 'Poppins-SemiBold', 
      fontSize: hS(15), 
      color: '#fff', 
      letterSpacing: .2
   }, 

   desc: {
      fontFamily: 'Poppins-Medium', 
      fontSize: hS(10), 
      color: '#fff', 
      letterSpacing: .2,
      marginTop: vS(4)
   }, 

   syncDataButton: {
      width: hS(150), 
      height: vS(56), 
      borderRadius: hS(24), 
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: '#fff', 
      marginTop: vS(28)
   }, 

   syncDataButtonText: {
      fontFamily: 'Poppins-SemiBold', 
      fontSize: hS(12), 
      color: darkPrimary, 
      letterSpacing: .2,
      textTransform: 'uppercase'
   }, 

   cloudSvg: {
      marginBottom: vS(-18)
   }
})