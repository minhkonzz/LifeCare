import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { darkHex, darkRgb, primaryRgb, primaryHex } from '@utils/constants/colors' 
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import withPopupBehavior from '@hocs/withPopupBehavior'

export default withPopupBehavior(
   () => {
      return (
         <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollview}
            contentContainerStyle={styles.content}>
            <Text style={styles.t1}>Guide for you through fasting period</Text>
            <View style={styles.v1}>
               <View style={styles.v2}>
                  <View style={styles.dc} />
                  <View style={styles.dotL} />
                  <View style={styles.dc} />
                  <View style={{...styles.dotL, height: vS(174) }} />
                  <View style={{...styles.dc, backgroundColor: primaryHex }} />
               </View>
               <View style={styles.v3}>
                  <View style={styles.v4}>
                     <Text style={styles.t2}>Fasting period starts from now</Text>
                  </View>
                  <View style={styles.v4}>
                     <Text style={styles.t2}>Drink water and do not eat</Text>
                  </View>
                  <View style={styles.v4}>
                     <Text style={styles.t2}>Follow reminder notifications</Text>
                  </View>
                  <View style={{...styles.v4, backgroundColor: `rgba(${primaryRgb.join(', ')}, .1)` }}>
                     <Text style={{...styles.t2, color: primaryHex, fontFamily: 'Poppins-SemiBold' }}>{"Tomorrow, 14:23\n"}<Text style={{ fontFamily: 'Poppins-Medium' }}>Comeback and stop fasting</Text></Text>
                  </View>
               </View>
            </View>
            <View style={styles.v5}>
               <Text style={styles.t1}>You should not fast if one of the following conditions exists</Text>
               <Text style={{...styles.t2 }}>{"1. Diabetes\n2. Low blood pressure\n3. Light weight\n4. Using medicines\n5. Are pregnant or breastfeeding\n6. Have problems getting pregnant"}</Text>
            </View>
            <View style={styles.v5}>
               <Text style={styles.t1}>Important tips</Text>
               <Text style={styles.t2}>{"1. Drink a lot of water\n2. Being hungry is normal\n3. If you feel discomfort, stop the fasting process and consult your doctor"}</Text>
            </View>
         </ScrollView>
      )
   },
   'bottomsheet', 
   'Fasting period already starts'
)

const styles = StyleSheet.create({
   scrollview: { height: vS(450) },
   content: {
      paddingTop: vS(16),
      paddingHorizontal: vS(12),
   },

   v1: {
      width: '100%',
      flexDirection: 'row'
   },

   v2: {
      alignItems: 'center',
      marginTop: vS(10)
   },

   v3: {
      width: hS(312),
      marginLeft: hS(16)
   },

   v4: {
      width: '100%',
      height: vS(84),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: `rgba(${darkRgb.join(', ')}, .08)`,
      marginTop: vS(8),
      borderRadius: 20
   },

   v5: {
      marginTop: vS(28)
   },

   t1: {
      fontSize: hS(14),
      fontFamily: 'Poppins-SemiBold',
      color: darkHex,
      letterSpacing: .2,
      marginBottom: vS(10)
   },

   t2: {
      fontFamily: 'Poppins-Regular',
      fontSize: hS(12),
      letterSpacing: .2,
      marginRight: vS(20),
      color: `rgba(${darkRgb.join(', ')}, .8)`,
      lineHeight: vS(25)
   },

   dc: {
      width: hS(10),
      height: vS(10),
      borderRadius: 50,
      backgroundColor: `rgba(${darkRgb.join(', ')}, .2)`
   },

   dotL: {
      height: vS(83),
      borderStyle: 'dashed',
      borderWidth: 1,
      borderColor: `rgba(${darkRgb.join(', ')}, .3)`
   }
})

