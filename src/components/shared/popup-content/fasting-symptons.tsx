import { ScrollView, Text, StyleSheet } from 'react-native'
import { Colors } from '@utils/constants/colors' 
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import withPopupBehavior from '@hocs/withPopupBehavior'

export default withPopupBehavior(
   () => {
      return (
         <>
            <ScrollView 
               showsVerticalScrollIndicator={false} 
               style={styles.scrollview}
               contentContainerStyle={styles.content}>
               <Text style={styles.text}>
                  {`Dring fasting period, you may feel a little tired, hungry and irritable, but you should never feel unwell.\n\nPlease pay close attention to your body, especially if you are new to fasting. If you feel uncomfortable of the plan is too hard to follow, try lowering the difficulty of the plan.\n\nIf the tired of weakness prevents you from completing your daily tasks, or you're experiencing unexpected feelings of sickness and discomfort, you should stop fasting straight away and ask your doctor for advice.`}
               </Text>
            </ScrollView>
         </>
      )
   },
   'bottomsheet', 
   'Symtoms during fasting'
)

const styles = StyleSheet.create({
   scrollview: { height: vS(450) },
   content: {
      paddingTop: vS(16),
      paddingBottom: vS(92),
      paddingHorizontal: vS(12),
   },

   text: {
      fontFamily: 'Poppins-Regular',
      fontSize: hS(14),
      color: Colors.darkPrimary.hex,
      letterSpacing: .2,
      lineHeight: vS(28)
   }
})

