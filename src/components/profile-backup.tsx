import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { darkHex, darkRgb } from '@utils/constants/colors'
import { CloudBackupIcon } from '@assets/icons'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import LinearGradient from 'react-native-linear-gradient'

export default (): JSX.Element => {
   return (
      <LinearGradient 
         style={styles.container}
         colors={[`rgba(${darkRgb.join(', ')}, .6)`, darkHex]}
         start={{ x: .5, y: 0 }}
         end={{ x: .52, y: .5 }}>
         <View>
            <Text style={styles.title}>Backup & Restore</Text>
            <Text style={styles.desc}>Sign in and synchronize your data</Text>
            <TouchableOpacity style={styles.syncDataButton} activeOpacity={.8}>
               <Text style={styles.syncDataButtonText}>Sync data</Text>
            </TouchableOpacity>
         </View>
         <CloudBackupIcon 
            style={styles.cloudSvg} 
            width={hS(92)} 
            height={vS(92)} />
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
      marginTop: vS(92), // delete
      borderRadius: hS(24),
      paddingHorizontal: hS(16), 
      paddingVertical: vS(16)
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
      color: darkHex, 
      letterSpacing: .2,
      textTransform: 'uppercase'
   }, 

   cloudSvg: {
      marginBottom: vS(-18)
   }
})