import { FC } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { primaryHex, darkHex, darkRgb, lightHex, lightRgb } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { EditIcon, BodyIcon } from '@assets/icons'
import { useSelector } from 'react-redux'
import { AppStore } from '../store'
import { commonStyles } from '@utils/stylesheet'
import LinearGradient from 'react-native-linear-gradient'

interface BodyPartProps {
   title: string,
   indicatorColor: string 
   value?: number
}

const BodyPart: FC<BodyPartProps> = ({ title, indicatorColor, value }) => {
   return (
      <View style={styles.bodyPart}>
         <View style={{...styles.bodyPartIndicator, backgroundColor: indicatorColor }} />
         <View style={styles.bodyPartDetail}>
            <Text style={styles.bodyPartTitle}>{title}</Text>
            <Text style={styles.bodyPartValue}>{`${value || '--'} cm`}</Text>
         </View>
      </View>
   )
}

export default (): JSX.Element => {
   const navigation = useNavigation<any>()
   const { chestMeasure, thighMeasure, waistMeasure, hipsMeasure } = useSelector((state: AppStore) => state.user.metadata)

   return (
      <LinearGradient
         style={styles.container}
         colors={[`rgba(${lightRgb.join(', ')}, .6)`, lightHex]}
         start={{ x: .5, y: 0 }}
         end={{ x: .52, y: .5 }}>
         <View style={[commonStyles.hrz, styles.header]}>
            <Animated.Text style={styles.title}>Body measurement</Animated.Text>
            <TouchableOpacity 
               style={styles.editButton} 
               activeOpacity={.8} 
               onPress={() => navigation.navigate('body-measures')}>
               <EditIcon width={hS(16)} height={vS(16)} />
            </TouchableOpacity>
         </View>
         <View style={commonStyles.hrz}>
            <View>
               <BodyIcon width={hS(105)} height={vS(105)} />
               <View style={[styles.bodyIndicator, styles.chestIndicator]} />
               <View style={[styles.bodyIndicator, styles.waistIndicator]} />
               <View style={[styles.bodyIndicator, styles.hipsIndicator]} />
               <View style={[styles.bodyIndicator, styles.thighIndicator]} />
            </View>
            <View style={{...styles.detail, ...commonStyles.hrz}}>
               <View style={styles.detailPart}>
                  <BodyPart title='Chest' indicatorColor={primaryHex} value={chestMeasure} />
                  <BodyPart title='Hips' indicatorColor='#7B3DFF' value={hipsMeasure} />
               </View>
               <View style={styles.gap} />
               <View style={styles.detailPart}>
                  <BodyPart title='Waist' indicatorColor='#FAFF00' value={waistMeasure} />
                  <BodyPart title='Thigh' indicatorColor='#FF8A00' value={thighMeasure} />
               </View>
            </View>
         </View>
      </LinearGradient>
   )
}

const styles = StyleSheet.create({
   container: {
      marginTop: vS(24), 
      width: hS(370),
      height: vS(193),
      borderRadius: hS(24), 
      paddingLeft: hS(24), 
      paddingTop: vS(12), 
      paddingRight: hS(12),
      paddingBottom: vS(18)
   }, 
   
   header: {
      width: '100%', 
      justifyContent: 'space-between', 
      marginBottom: vS(22)
   }, 

   title: {
      fontFamily: 'Poppins-SemiBold', 
      fontSize: hS(15), 
      color: darkHex, 
      letterSpacing: .2
   }, 

   editButton: {
      width: hS(36), 
      height: vS(36), 
      borderRadius: hS(18), 
      backgroundColor: `rgba(${darkRgb.join(', ')}, .18)`,
      justifyContent: 'center', 
      alignItems: 'center'
   }, 

   bodyPart: {
      flexDirection: 'row'
   }, 

   bodyPartIndicator: {
      width: hS(10), 
      height: vS(10), 
      borderRadius: hS(5), 
      marginRight: hS(4)
   }, 

   bodyPartDetail: {
      marginLeft: hS(10), 
      marginTop: vS(-4)
   }, 

   bodyPartTitle: {
      fontFamily: 'Poppins-Regular', 
      fontSize: hS(12), 
      color: darkHex, 
      letterSpacing: .2
   }, 

   bodyPartValue: {
      fontFamily: 'Poppins-SemiBold', 
      fontSize: hS(14), 
      color: darkHex, 
      letterSpacing: .2, 
      marginTop: vS(2)
   }, 

   detail: {
      marginLeft: hS(27)
   }, 

   bodyIndicator: {
      position: 'absolute',
      height: vS(3)
   }, 

   chestIndicator: {
      width: hS(26),
      top: vS(40),
      left: hS(40),  
      backgroundColor: primaryHex
   }, 

   waistIndicator: {
      width: hS(26),
      top: vS(52),  
      left: hS(40),  
      backgroundColor: '#FAFF00'
   }, 

   hipsIndicator: {
      width: hS(30), 
      top: vS(60),  
      left: hS(37),  
      backgroundColor: '#7B3DFF'
   }, 

   thighIndicator: {
      width: hS(12), 
      top: hS(74),
      left: hS(35), 
      transform: [{ rotate: '12deg' }], 
      backgroundColor: '#FF8A00'
   }, 

   detailPart: {
      height: vS(100), 
      justifyContent: 'space-between'
   }, 

   gap: {
      width: hS(32)
   }
})