import { useRef, useEffect } from 'react'
import { darkHex, darkRgb } from '@utils/constants/colors'
import { useRoute } from '@react-navigation/native'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { ClockIcon } from '@assets/icons'
import {
   View, 
   Text,
   ScrollView, 
   Image, 
   Animated, 
   StyleSheet
} from 'react-native'

export default (): JSX.Element => {
   const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current
   const route = useRoute()
   const {
      banner, 
      title, 
      content,
      mins_read,
      category
   } = route.params

   useEffect(() => {
      Animated.timing(animateValue, {
         toValue: 1, 
         duration: 920,
         useNativeDriver: true 
      }).start()
   }, [])

   return (
      <View style={styles.container}>
         <Image style={styles.banner} source={banner} />
         <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.main}
            contentContainerStyle={styles.mainContent}>
            <View style={{...styles.hrz, ...styles.header}}>
               <Text style={styles.category}>{ category }</Text>
               <View style={styles.hrz}>
                  <ClockIcon width={hS(12)} height={vS(12)} />
                  <Text style={styles.minsRead}>{`${mins_read} mins read`}</Text>
               </View>
            </View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.content}>{content}</Text>
         </ScrollView>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1, 
      alignItems: 'center'
   }, 

   hrz: {
      flexDirection: 'row',
      alignItems: 'center'
   },

   header: {
      width: '100%',
      justifyContent: 'space-between'
   },

   banner: {
      position: 'absolute',
      width: '100%',
      height: vS(326)
   },

   main: {
      position: 'absolute',
      bottom: 0,
      left: 0, 
      right: 0,
      borderTopLeftRadius: hS(24), 
      borderTopRightRadius: hS(24), 
      height: vS(534),
      backgroundColor: '#fff'
   }, 

   mainContent: {
      paddingHorizontal: hS(24),
      paddingVertical: vS(22)
   },

   category: {
      fontFamily: 'Poppins-Medium',
      fontSize: hS(12),
      color: `rgba(${darkRgb.join(', ')}, .8)`, 
      letterSpacing: .2
   }, 

   minsRead: {
      fontFamily: 'Poppins-Regular',
      fontSize: hS(12),
      color: darkHex,
      letterSpacing: .2,
      marginLeft: hS(7)
   },

   title: {
      width: '100%',
      lineHeight: vS(28),
      fontFamily: 'Poppins-SemiBold', 
      fontSize: hS(18),
      color: darkHex,
      letterSpacing: .2,
      marginTop: vS(15)
   },

   content: {
      fontFamily: 'Poppins-Regular',
      fontSize: hS(12), 
      color: darkHex,
      letterSpacing: .2, 
      lineHeight: vS(25), 
      marginTop: vS(15)
   }
})