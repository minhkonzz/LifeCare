import { View, Text, StyleSheet } from 'react-native' 
import { darkHex, darkRgb, primaryHex } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import LottieView from 'lottie-react-native'

interface FastingStageProps {
   item: any,  
   elapsedTimeInHours: number
}

export default ({ item, elapsedTimeInHours }: FastingStageProps): JSX.Element => {
   const { title, from, to, content, icon } = item
   const MainIcon = icon
   const active = elapsedTimeInHours >= from && elapsedTimeInHours <= to
   return (
      <View style={styles.container}>
         <View style={styles.stageIcBg}>
            <AnimatedCircularProgress
               lineCap='round'
               style={{ position: 'absolute' }}
               width={hS(8)}
               size={hS(122)}
               rotation={360}
               fill={elapsedTimeInHours > to ? 100 : (elapsedTimeInHours - from) / (to - from) * 100}
               tintColor='#30E3CA'
               backgroundColor='rgba(255, 255, 255, .4)'
            />
            <MainIcon width={hS(72)} height={vS(72)} />
         </View>
         <View style={styles.titleWrapper}>
            { active && <LottieView style={styles.primaryRing} source={require('../assets/lottie/primary-ring.json')} autoPlay /> }
            <Text style={{...styles.title, ...(active ? { color: primaryHex, fontFamily: 'Poppins-SemiBold', marginTop: vS(-52) } : {})}}>{title}</Text> 
         </View>
         <Text style={styles.hrsRangeText}>{`${from} - ${to} hours`}</Text>
         <Text style={styles.content}>{content}</Text>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      width: hS(370),
      alignItems: 'center',
      marginTop: vS(60)
   },

   titleWrapper: {
      width: '100%'
   },
   
   primaryRing: {
      marginLeft: hS(15),
      width: hS(80),
      height: vS(80),
      marginTop: vS(30)
   },

   stageIcBg: {
		width: hS(120),
		height: vS(120),
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 500,
      backgroundColor: darkHex
   },

   title: {
      fontFamily: 'Poppins-Medium', 
      fontSize: hS(16), 
      color: darkHex, 
      letterSpacing: .2,
      lineHeight: vS(22), 
      marginTop: vS(20),
      alignSelf: 'center'
   }, 

   hrsRangeText: {
      fontFamily: 'Poppins-Medium', 
      fontSize: hS(13), 
      color: `rgba(${darkRgb.join(', ')}, .7)`, 
      letterSpacing: .2, 
      marginTop: vS(14)
   }, 

   content: {
      fontFamily: 'Poppins-Regular', 
      fontSize: hS(14), 
      color: `rgba(${darkRgb.join(', ')}, .8)`, 
      letterSpacing: .2,
      lineHeight: vS(24), 
      marginTop: vS(22)
   }
})