import { View, Text, StyleSheet } from 'react-native' 
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import LinearGradient from 'react-native-linear-gradient'
import RingIndicator from './shared/ring-indicator'

const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary

interface FastingStageProps {
   item: any, 
   index: number, 
   elapsedHours: number
}

export default ({ item, index, elapsedHours }: FastingStageProps): JSX.Element => {
   const { title, from, to, content, icon } = item
   const MainIcon = icon
   const active = elapsedHours >= from && elapsedHours <= to
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
               colors={[`rgba(${darkRgb.join(', ')}, .6)`, darkHex]}
               start={{ x: .5, y: 0 }}
               end={{ x: .52, y: .5 }}>
               <View style={styles.header}>
                  <LinearGradient
							style={styles.stageIcBg}
							colors={['#000', 'rgba(0, 0, 0, 0)']}
							start={{ x: .5, y: 0 }}
							end={{ x: .5, y: 1 }}>
							<AnimatedCircularProgress
								lineCap='round'
								style={{ position: 'absolute' }}
								width={hS(7)}
								size={hS(80)}
								rotation={360}
								fill={elapsedHours > to ? 100 : (elapsedHours - from) / (to - from) * 100}
								tintColor='#30E3CA'
								backgroundColor='rgba(255, 255, 255, .4)'
							/>
							<MainIcon width={hS(36)} height={vS(36)} />
						</LinearGradient>
                  <View>
                     <Text style={styles.title}>{title}</Text>   
                     <View style={styles.hrsRange}>
                        <Text style={styles.hrsRangeText}>{`${from} - ${to} hours`}</Text>
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
   alignCenter: { alignItems: 'center' },
   container: { flexDirection: 'row' },
   main: { marginLeft: hS(14) },

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
      borderColor: `rgba(${darkRgb.join(', ')}, .12)`
   }, 

   lineIndicator: {
      height: vS(320), 
      width: hS(2.5), 
      backgroundColor: `rgba(${darkRgb.join(', ')}, .12)`
   }, 

   stageNumber: {
      fontFamily: 'Poppins-Medium', 
      fontSize: hS(12), 
      color: `rgba(${darkRgb.join(', ')}, .6)`,
      letterSpacing: .2, 
      marginBottom: vS(12)
   },

   stageIcBg: {
      marginTop: -0.5,
		width: hS(78),
		height: vS(78),
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 500
   },

   header: {
      flexDirection: 'row',
      alignItems: 'center'
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