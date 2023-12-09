import { View, Text, StyleSheet, Pressable } from 'react-native'
import { SCREEN_WIDTH, horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { Colors } from '@utils/constants/colors'
import { CloseIcon } from '@assets/icons'
import Carousel from '@components/shared/carousel'
import LottieView from 'lottie-react-native'

const tipsData = [
   // {
   //    id: 'wt1',
   //    text: "Water is a zero-calorie drink\nIt doesn't break your fast1",
   //    lottie: require('../assets/lottie/water-screen-animation-2.json')
   // },
   {
      id: 'wt1',
      text: "Remember to drink water more frequently during fasting\n\nDrink water may even help you prevent hunger and adapt to longer fasting",
      lottie: require('../assets/lottie/water-screen-animation-1.json')
   },
   {
      id: 'wt2',
      text: "Mineral water helps reduce symptons:\n\n- Weakness\n- Headaches\n- Nausea",
      lottie: require('../assets/lottie/water-screen-animation-4.json')
   }
]

const WaterTip = ({ item }): JSX.Element => {
   return (
      <View key={item.id} style={styles.tip}>
         <LottieView 
            style={styles.lottie}
            source={item.lottie} 
            autoPlay />
         <Text style={styles.text}>{item.text}</Text>
      </View>
   )
}

export default (): JSX.Element => {
   return (
      <View style={styles.container}>
         <Carousel items={WaterTip} data={tipsData} style={styles.carousel} />
         <View style={styles.overlay}>
            <Pressable style={styles.closeButton}>
               <CloseIcon width={hS(24)} height={vS(24)} />
            </Pressable>
         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   hrz: {
      flexDirection: 'row'
   },

   carousel: {
      flex: 1
   },

   container: {
      flex: 1, 
      backgroundColor: '#fff'
   },

   tip: {
      width: SCREEN_WIDTH,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: hS(32)
   },

   overlay: {
      flex: 1,
      position: 'absolute',
      paddingHorizontal: hS(24),
      paddingVertical: vS(22)
   },

   closeButton: {
      alignSelf: 'flex-end'
   },

   lottie: {
      width: hS(220),
      height: vS(220)
   },

   text: {
      fontSize: hS(16),
      fontFamily: 'Poppins-Regular',
      color: Colors.darkPrimary.hex, 
      letterSpacing: .2,
      lineHeight: vS(24),
      marginTop: vS(60)
   }
})
