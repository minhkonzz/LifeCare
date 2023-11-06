import React, { memo, useState, useEffect, useRef } from 'react'
import { View, Text, FlatList, TextInput, StyleSheet, Button, TouchableOpacity, Animated } from 'react-native'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import LinearGradient from 'react-native-linear-gradient'
import BackIcon from '@assets/icons/goback.svg'
import EditIcon from '@assets/icons/edit.svg'

const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary

export default (): JSX.Element => {
   const maxCurrentWeight = 125
   const currentWeight = 90
   const maxValueMeasure = Math.ceil(maxCurrentWeight / 10) * 10
   const days = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

   return (
      <View style={styles.container}>
         <LinearGradient
            style={styles.main}
            colors={[`rgba(255, 211, 110, .2)`, `rgba(255, 211, 110, .8)`]}
            start={{ x: .5, y: 0 }}
            end={{ x: 1, y: 1 }}>
            <View style={[styles.hrz, styles.header]}>
               <View style={styles.hrz}>
                  <Text style={styles.title}>Weight</Text>
                  <TouchableOpacity
                     activeOpacity={.8} 
                     style={[styles.hrz, styles.symb]}>
                     <Text style={styles.symbTitle}>lb</Text>
                     <BackIcon style={styles.symbIndicator} width={hS(5)} height={vS(8.5)} />
                  </TouchableOpacity>
               </View>
               <TouchableOpacity 
                  style={styles.editButton} 
                  activeOpacity={.8}>
                  <EditIcon width={hS(16)} height={vS(16)} />
               </TouchableOpacity>
            </View>
            <View>
               <View style={styles.hrz}>
                  <Text style={styles.weightValue}>72.52</Text>
                  <Text style={styles.weightSymb}>lb</Text>
               </View>
               <View style={styles.progressBar}>
                  <View style={styles.activeBar} />
               </View>
               <View style={[styles.hrz, styles.progressDesc]}>
                  <Text style={styles.progressText}>Starting: 87.61 lb</Text>
                  <Text style={styles.progressText}>Goal: 62.5 lb</Text>
               </View>
            </View>

            <View style={styles.chart}>
               <View style={{ marginRight: hS(14), alignItems: 'flex-end' }}>
               { Array.from({ length: 6 }, (_, i) => maxValueMeasure - 10 * i).map((e, i) => 
                  <Text key={i} style={{...styles.chartValue, marginTop: i > 0 ? vS(22) : 0}}>{e}</Text>
               ) }
               </View>
               <View style={{ width: hS(292) }}>
                  <FlatList 
                     horizontal
                     showsHorizontalScrollIndicator={false}
                     data={days} 
                     renderItem={({ item, index }) => 
                        <View key={index} style={{ alignItems: 'center', marginLeft: index > 0 ? hS(28) : 0 }}>
                           <View style={{...styles.dayDecor, backgroundColor: index % 2 && `rgba(${darkRgb.join(', ')}, .5)` || `rgba(${darkRgb.join(', ')}, .3)` }} />
                           <Text style={{...styles.chartValue, marginTop: vS(8)}}>{ item }</Text>
                        </View>
                     } />
                     <View style={{ 
                        position: 'absolute', 
                        width: '100%', 
                        bottom: (currentWeight < 80 ? 0 : currentWeight > 130 ? vS(220) : (vS(currentWeight) - vS(80)) / vS(24.5) * 100) + vS(26)
                     }}>
                        <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: hS(10), color: '#FF8E00', letterSpacing: .2, position: 'absolute', right: 0, bottom: vS(4) }}>{`${currentWeight} kg`}</Text>
                        <View style={{ borderWidth: 1.5, borderStyle: 'dashed', borderColor: '#FF8E00', width: '100%' }} />
                     </View>
               </View>
            </View>
         </LinearGradient>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: hS(24),
      alignItems: 'center'
   }, 

   main: {
      width: '100%',
      borderRadius: hS(24),
      paddingRight: hS(12),
      paddingVertical: vS(16), 
      paddingLeft: hS(24)
   },

   hrz: {
      flexDirection: 'row', 
      alignItems: 'center'
   },

   header: {
      justifyContent: 'space-between', 
      marginBottom: vS(16)
   },

   title: {
      fontFamily: 'Poppins-SemiBold', 
      fontSize: hS(15), 
      color: darkHex, 
      letterSpacing: .2
   }, 

   symb: {
      width: hS(65), 
      height: vS(30), 
      borderRadius: 100, 
      backgroundColor: `rgba(${darkRgb.join(', ')}, .16)`, 
      marginLeft: hS(13), 
      justifyContent: 'center', 
      alignItems: 'center'
   },

   symbTitle: {
      fontFamily: 'Poppins-Medium', 
      fontSize: hS(14), 
      color: darkHex, 
      letterSpacing: .2, 
      marginRight: hS(8)
   },

   symbIndicator: {
      transform: [{ rotate: '-90deg' }]
   },

   editButton: {
      width: hS(36), 
      height: vS(36), 
      borderRadius: hS(18), 
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: `rgba(${darkRgb.join(', ')}, .12)`
   }, 

   weightValue: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: hS(28), 
      color: darkHex, 
      letterSpacing: .2
   }, 

   weightSymb: {
      fontFamily: 'Poppins-SemiBold', 
      fontSize: hS(14), 
      color: darkHex, 
      letterSpacing: .2, 
      marginLeft: hS(10), 
      marginTop: vS(8)
   },

   progressBar: {
      width: '100%', 
      height: vS(10), 
      borderRadius: 50, 
      backgroundColor: '#fff'
   }, 

   activeBar: {
      width: '63%', 
      height: '100%', 
      borderRadius: 50
   },

   progressText: {
      fontFamily: 'Poppins-Medium', 
      fontSize: hS(10),
      color: `rgba(${darkRgb.join(', ')}, .8)`,
      letterSpacing: .2
   }, 

   progressDesc: {
      marginTop: vS(8), 
      justifyContent: 'space-between'
   },

   chart: {
      flexDirection: 'row', 
      marginTop: vS(32)
   },

   chartValue: {
      fontFamily: 'Poppins-Regular',
      fontSize: hS(10),
      color: darkHex,
      letterSpacing: .2
   },

   dayDecor: {
      width: hS(1),
      height: vS(220)
   }
})