import { 
   View,
   Text,
   StyleSheet, 
   Image,
   TouchableOpacity
} from 'react-native'

import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'

const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary

export default ({ item, index }: { item: any, index: number }): JSX.Element => {
   return (
      <View style={{...styles.container, marginTop: index > 0 ? hS(16) : 0 }}>
         <View style={styles.detail}>
            <View style={styles.imageWrapper}>
               <Image style={styles.image} source={require('../assets/images/nutrition-personal-food.png')} />
            </View>
            <View style={styles.texts}>
               <Text style={styles.title}>Salad with wheat and white egg</Text>
               <Text style={styles.desc}>200 cals, 520g</Text>
            </View>
         </View>
         <TouchableOpacity 
            style={styles.editButton}
            onPress={() => {}}
            activeOpacity={.8}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
         </TouchableOpacity>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      width: '100%', 
      flexDirection: 'row', 
      justifyContent: 'space-between',   
      alignItems: 'flex-end'    
   }, 

   detail: {
      flexDirection: 'row'
   },

   imageWrapper: {
      elevation: 5, 
      shadowColor: `rgba(0, 0, 0, .25)`
   },

   image: {
      width: hS(105) ,
      height: vS(105),
      borderRadius: 2000
   }, 

   texts: {
      marginLeft: hS(16)
   },

   title: {
      width: hS(184), 
      lineHeight: vS(22),
      fontFamily: 'Poppins-Medium', 
      fontSize: hS(13), 
      color: darkHex, 
      letterSpacing: .2
   }, 

   desc: {
      fontFamily: 'Poppins-Regular', 
      fontSize: hS(10), 
      color: darkHex, 
      letterSpacing: .2, 
      marginTop: vS(7)
   }, 

   editButton: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      flexDirection: 'row', 
      width: hS(32), 
      height: vS(32), 
      borderRadius: hS(14), 
      backgroundColor: `rgba(${darkRgb.join(', ')}, .1)`, 
      justifyContent: 'center', 
      alignItems: 'center',
      marginTop: vS(4)
   },

   dot: {
      width: hS(4), 
      marginHorizontal: 1,
      height: vS(4), 
      borderRadius: 10, 
      backgroundColor: `rgba(${darkRgb.join(', ')}, .32)`
   }
})