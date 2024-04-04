import { Dispatch, SetStateAction } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { darkHex } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import withPopupBehavior from '@hocs/withPopupBehavior'
import UserService from '@services/user'

export default withPopupBehavior(
   ({ 
      setVisible, 
      onConfirm
   }: { 
      setVisible: Dispatch<SetStateAction<any>>,
      onConfirm: (afterDisappear: () => Promise<void>) => void
   }) => {

      const onSignOut = async () => {
         await UserService.signOut()
         setVisible(null)
      }

      return (
         <>
            <Text style={styles.title}>Are you sure want to logout this account</Text>
            <TouchableOpacity
               style={styles.logoutButton}
               activeOpacity={.8}
               onPress={() => onConfirm(onSignOut)}>
               <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
         </>
      )
   },
   'centered',
   'Logout',
   hS(300)
)

const styles = StyleSheet.create({
   title: {
      fontFamily: 'Poppins-Regular',
      fontSize: hS(12), 
      color: darkHex, 
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