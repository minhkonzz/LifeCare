import { useEffect } from 'react'
import { View, Text, ScrollView, Image, Animated, StyleSheet } from 'react-native'
import { darkHex, darkRgb } from '@utils/constants/colors'
import { useRoute } from '@react-navigation/native'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { ClockIcon } from '@assets/icons'
import { commonStyles } from '@utils/stylesheet'
import useAnimValue from '@hooks/useAnimValue'

const { hrz } = commonStyles

export default (): JSX.Element => {
   const animateValue = useAnimValue(0)
   const route = useRoute<any>()
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
            <View style={{...hrz, ...styles.header}}>
               <Text style={styles.category}>{ category }</Text>
               <View style={hrz}>
                  <ClockIcon width={hS(12)} height={vS(12)} />
                  <Text style={styles.minsRead}>{`${mins_read} mins read`}</Text>
               </View>
            </View>
            <Text style={styles.title}>{title}</Text>
            <View>
               { content.map((e: any) => {
                  switch (e.k) {
                     case "desc": return (
                        <Text style={styles.content}>{e.v}</Text>
                     )
                     case "section_title": return (
                        <Text style={styles.sectionTitle}>{e.v}</Text>
                     )
                     case "image": return (
                        <Image source={e.v} style={styles.imageContent} />
                     )
                  }
               }) }
            </View>
         </ScrollView>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1, 
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
   },

   sectionTitle: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: hS(14), 
      color: darkHex,
      letterSpacing: .2, 
      lineHeight: vS(25), 
      marginTop: vS(12)
   },
   
   imageContent: {
      width: '100%'
   },
})