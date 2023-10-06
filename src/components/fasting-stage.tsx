import { ReactNode } from 'react'
import { View, Text, StyleSheet } from 'react-native' 
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import LinearGradient from 'react-native-linear-gradient'
import RingIndicator from './shared/ring-indicator'

interface FastingStageProps {
   title: string, 
   index: number,
   fromHrs: number, 
   toHrs: number, 
   content: string,
   active?: boolean, 
   icon?: ReactNode
}

export default ({ 
   title, 
   index,
   fromHrs, 
   toHrs, 
   content, 
   active,
   icon 
}: FastingStageProps): JSX.Element => {
   return (
      <View style={styles.container}>
         <View style={styles.alignCenter}>
            <View style={styles.circleIndicator}>
               { active && <RingIndicator color='primary' size={hS(14)} /> }
            </View>
            <View style={styles.lineIndicator} />
         </View>
         <View style={styles.main}>
            <Text style={styles.stageNumber}>{`STAGE ${index + 1}`}</Text>
            <LinearGradient 
               style={styles.mainContent}
               colors={[`rgba(${Colors.darkPrimary.rgb.join(', ')}, .6)`, Colors.darkPrimary.hex]}
               start={{ x: .5, y: 0 }}
               end={{ x: .52, y: .5 }}>
               <View style={styles.header}>
                  <View style={styles.stageCircle} />
                  <View style={{ marginLeft: hS(15) }}>
                     <Text style={styles.title}>{title}</Text>   
                     <View style={styles.hrsRange}>
                        <Text style={styles.hrsRangeText}>{`${fromHrs} - ${toHrs} hours`}</Text>
                     </View>
                  </View>            
               </View>
               <Text style={styles.content}>{content}</Text>
            </LinearGradient>
         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   alignCenter: {
      alignItems: 'center'
   },

   container: {
      flexDirection: 'row'
   },

   main: {
      marginLeft: hS(14)
   },

   mainContent: {
      width: hS(322),  
      borderRadius: hS(32), 
      paddingHorizontal: hS(22),
      paddingVertical: vS(12)
   }, 

   circleIndicator: {   
      width: hS(24), 
      height: vS(24), 
      borderWidth: 2, 
      borderRadius: hS(12), 
      justifyContent: 'center', 
      alignItems: 'center', 
      borderColor: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .12)`
   }, 

   lineIndicator: {
      height: vS(320), 
      width: hS(2.5), 
      backgroundColor: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .12)`
   }, 

   stageNumber: {
      fontFamily: 'Poppins-Medium', 
      fontSize: hS(12), 
      color: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .6)`,
      letterSpacing: .2, 
      marginBottom: vS(12)
   },

   header: {
      flexDirection: 'row',
      alignItems: 'center'
   }, 

   stageCircle: {
      width: hS(80),  
      height: vS(80),
      borderRadius: hS(200), 
      borderWidth: 1, 
      borderColor: '#fff'
   }, 

   title: {
      width: hS(173),
      fontFamily: 'Poppins-Medium', 
      fontSize: hS(14), 
      color: '#fff', 
      letterSpacing: .2,
      lineHeight: vS(22)
   }, 

   hrsRange: {
      justifyContent: 'center', 
      alignItems: 'center', 
      borderRadius: 100,
      paddingVertical: vS(5), 
      backgroundColor: `rgba(255, 255, 255, .12)`,
      marginTop: vS(9)
   },

   hrsRangeText: {
      fontFamily: 'Poppins-Medium', 
      fontSize: hS(12), 
      color: '#fff', 
      letterSpacing: .2, 
      marginTop: 1
   }, 

   content: {
      fontFamily: 'Poppins-Regular', 
      fontSize: hS(12), 
      color: '#fff', 
      letterSpacing: .2,
      lineHeight: vS(20), 
      marginTop: vS(22)
   }
})