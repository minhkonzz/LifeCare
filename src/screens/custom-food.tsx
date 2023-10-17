import { 
   View, 
   Text,
   TextInput, 
   Pressable,
   ScrollView, 
   StyleSheet
} from 'react-native'

import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import Screen from '@components/shared/screen' 
import StackHeader from '@components/shared/stack-header'
import LinearGradient from 'react-native-linear-gradient'
import PhotoIcon from '@assets/icons/photo.svg'

const { hex: primaryHex, rgb: primaryRgb } = Colors.primary
const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary

export default (): JSX.Element => {
   return (
      <Screen full paddingHorzContent>
         <StackHeader title='Add custom food' />
         <ScrollView
            contentContainerStyle={styles.scrollView}
            showsVerticalScrollIndicator={false}>
            <View style={styles.section}>
               <View style={styles.horz}>
                  <LinearGradient 
                     style={styles.sectionDecor} 
                     colors={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]} 
                     start={{ x: .5, y: 0 }}
                     end={{ x: .5, y: 1 }} /> 
                  <Text style={styles.sectionTitle}>Basic information</Text>
               </View>
               <View style={[styles.row, styles.horz]}>
                  <Text style={styles.rowTitle}>Photo</Text>
                  <Pressable>
                     <PhotoIcon width={hS(22)} height={vS(22)} />
                  </Pressable>
               </View>
               <View style={[styles.row, styles.horz]}>
                  <Text style={styles.rowTitle}>Title</Text>
                  <TextInput placeholder='required' style={styles.rowInput}/>
               </View>
               <View style={[styles.row, styles.horz]}>
                  <Text style={styles.rowTitle}>Category</Text>
                  <TextInput placeholder='optional' style={styles.rowInput}/>
               </View>
               <View style={[styles.row, styles.horz]}>
                  <Text style={styles.rowTitle}>1 serving equal</Text>
                  <View style={{ width: hS(110), height: vS(45), paddingHorizontal: hS(10), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderRadius: hS(12), borderColor: `rgba(${darkRgb.join(', ')}, .32)` }}>
                     <TextInput style={{ width: hS(80), height: '108%', fontFamily: 'Poppins-Regular', fontSize: hS(12), color: darkHex, letterSpacing: .2, marginTop: vS(4) }} />
                     <Text style={{ fontFamily: 'Poppins-Regular', fontSize: hS(12), color: `rgba(${darkRgb.join(', ')}, .5)`, letterSpacing: .2 }}>.g</Text>
                  </View>
               </View>
            </View>
            <View style={styles.section}>
               <View style={styles.horz}>
                  <LinearGradient 
                     style={styles.sectionDecor} 
                     colors={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]} 
                     start={{ x: .5, y: 0 }}
                     end={{ x: .5, y: 1 }} /> 
                  <Text style={styles.sectionTitle}>Nutritional information</Text>
               </View>
               <View style={[styles.row, styles.horz]}>
                  <Text style={styles.rowTitle}>Calories</Text>
                  <View style={{ height: vS(45), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                     <TextInput placeholder='required' style={{ width: hS(80), height: '108%', fontFamily: 'Poppins-Regular', fontSize: hS(14), color: darkHex, letterSpacing: .2, marginTop: vS(4), marginRight: hS(7), textAlign: 'right' }} />
                     <Text style={{ fontFamily: 'Poppins-Regular', fontSize: hS(12), color: `rgba(${darkRgb.join(', ')}, .5)`, letterSpacing: .2 }}>.g</Text>
                  </View>
               </View>
               <View style={[styles.row, styles.horz]}>
                  <Text style={styles.rowTitle}>Protein</Text>
                  <View style={{ height: vS(45), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                     <TextInput placeholder='required' style={{ width: hS(80), height: '108%', fontFamily: 'Poppins-Regular', fontSize: hS(14), color: darkHex, letterSpacing: .2, marginTop: vS(4), marginRight: hS(7), textAlign: 'right' }} />
                     <Text style={{ fontFamily: 'Poppins-Regular', fontSize: hS(12), color: `rgba(${darkRgb.join(', ')}, .5)`, letterSpacing: .2 }}>.g</Text>
                  </View>
               </View>
               <View style={[styles.row, styles.horz]}>
                  <Text style={styles.rowTitle}>Carbs</Text>
                  <View style={{ height: vS(45), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                     <TextInput placeholder='required' style={{ width: hS(80), height: '108%', fontFamily: 'Poppins-Regular', fontSize: hS(14), color: darkHex, letterSpacing: .2, marginTop: vS(4), marginRight: hS(7), textAlign: 'right' }} />
                     <Text style={{ fontFamily: 'Poppins-Regular', fontSize: hS(12), color: `rgba(${darkRgb.join(', ')}, .5)`, letterSpacing: .2 }}>.g</Text>
                  </View>
               </View>
               <View style={[styles.row, styles.horz]}>
                  <Text style={styles.rowTitle}>Fat</Text>
                  <View style={{ height: vS(45), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                     <TextInput placeholder='required' style={{ width: hS(80), height: '108%', fontFamily: 'Poppins-Regular', fontSize: hS(14), color: darkHex, letterSpacing: .2, marginTop: vS(4), marginRight: hS(7), textAlign: 'right' }} />
                     <Text style={{ fontFamily: 'Poppins-Regular', fontSize: hS(12), color: `rgba(${darkRgb.join(', ')}, .5)`, letterSpacing: .2 }}>.g</Text>
                  </View>
               </View>
            </View>
         </ScrollView>
      </Screen>
   )
}

const styles = StyleSheet.create({
   scrollView: {
      width: hS(366)
   }, 

   horz: {
      flexDirection: 'row', 
      alignItems: 'center'
   },

   section: {
      marginTop: vS(28)
   }, 

   sectionDecor: {
      width: hS(7), 
      height: vS(27),
      borderRadius: 50
   },

   sectionTitle: {
      fontFamily: 'Poppins-Medium',
      fontSize: hS(16), 
      color: darkHex, 
      letterSpacing: .2, 
      marginLeft: hS(14)
   }, 

   row: {
      width: '100%', 
      justifyContent: 'space-between', 
      marginTop: vS(16)
   }, 

   rowTitle: {
      fontFamily: 'Poppins-Regular', 
      fontSize: hS(14), 
      color: darkHex, 
      letterSpacing: .2
   }, 

   rowInput: {
      fontFamily: 'Poppins-Regular', 
      fontSize: hS(14), 
      color: `rgba(${darkRgb.join(', ')}, .6)`, 
      letterSpacing: .2, 
      textAlign: 'right'
   }
})

