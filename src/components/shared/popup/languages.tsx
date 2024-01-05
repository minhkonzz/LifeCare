import { useState } from 'react'
import { View, Text, Pressable, StyleSheet, TouchableOpacity } from 'react-native'
import { primaryHex, primaryRgb, darkHex, darkRgb } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { commonStyles } from '@utils/stylesheet'
import withPopupBehavior from '@hocs/withPopupBehavior'
import LinearGradient from 'react-native-linear-gradient'

const { popupButton, popupButtonBg, popupButtonText } = commonStyles
const options: string[] = ['Vietnamese', 'Korean', 'English']

export default withPopupBehavior(
   ({ 
      onConfirm
   }: {
      onConfirm: (afterDisappear: () => Promise<void>) => void 
   }) => {
      const [ selectedIndex, setSelectedIndex ] = useState<number>(2)

      const onSave = async () => {
         
      }

      return (
         <>
            {
               options.map((e, i) => 
                  <Pressable 
                     key={i} 
                     style={[styles.option, { marginTop: (i === 0 ? 0 : vS(33)) }]}
                     onPress={() => setSelectedIndex(i)}>
                     <Text style={styles.optionText}>{e}</Text>
                     <View style={styles.circleBound}>
                     { 
                        selectedIndex === i && 
                        <LinearGradient 
                           style={styles.primaryIndicator}
                           colors={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]}
                           start={{ x: .5, y: 0 }}
                           end={{ x: .5, y: 1 }}
                        />
                     }
                     </View>
                  </Pressable>
               )
            }
            <TouchableOpacity
               onPress={() => onConfirm(onSave)}
               activeOpacity={.7}
               style={popupButton}>
               <LinearGradient
                  style={popupButtonBg}
                  colors={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]}
                  start={{ x: .5, y: 0 }}
                  end={{ x: .5, y: 1 }}>
                  <Text style={popupButtonText}>Save</Text>
               </LinearGradient>
            </TouchableOpacity>
         </>
      )
   },
   'centered',
   'Languages',
   hS(280)
)

const styles = StyleSheet.create({
   option: {
      width: '100%', 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems: 'center'
   },

   optionText: {
      fontFamily: 'Poppins-Ragular', 
      fontSize: hS(15), 
      color: darkHex,
      letterSpacing: .2
   }, 

   circleBound: {
      width: hS(22), 
      height: vS(22), 
      borderRadius: hS(11), 
      borderWidth: 1, 
      borderColor: `rgba(${darkRgb.join(', ')}, .5)`, 
      justifyContent: 'center', 
      alignItems: 'center'
   }, 

   primaryIndicator: {
      width: hS(14), 
      height: vS(14), 
      borderRadius: hS(7)
   }
})