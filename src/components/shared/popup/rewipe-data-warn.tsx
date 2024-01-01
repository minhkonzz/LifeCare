import { Dispatch, SetStateAction } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { darkHex } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import withPopupBehavior from '@hocs/withPopupBehavior'

export default withPopupBehavior(
   ({ 
      setVisible, 
      onConfirm
   }: { 
      setVisible: Dispatch<SetStateAction<any>>,
      onConfirm: (afterDisappear: () => Promise<void>) => void
   }) => {

      const onSave = async () => {
         setVisible(null)
      }

      return (
         <>
            <Text style={styles.title}>
               Please backup or synchronize your all data before this action because you cannot recover current data after rewipe
            </Text>
            <TouchableOpacity
               style={styles.rewipeButton}
               onPress={() => onConfirm(onSave)}
               activeOpacity={.8}>
               <Text style={styles.rewipeButtonText}>Rewipe all data</Text>
            </TouchableOpacity>
         </>  
      )
   },
   'centered', 
   'Warning',
   hS(264)
)

const styles = StyleSheet.create({
   title: {
      fontFamily: 'Poppins-Regular',
      fontSize: hS(12), 
      color: darkHex, 
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