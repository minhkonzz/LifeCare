import { memo, useState, useRef } from 'react'
import { View, Text, Pressable, Animated, StyleSheet, TouchableOpacity } from 'react-native'
import { Colors } from '@utils/constants/colors'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../../../store'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { RadioOptionsPopupProps } from '@utils/interfaces'
import { updateMetadata } from '../../../store/user'
import UserService from '@services/user'
import Popup from '@components/shared/popup'
import LinearGradient from 'react-native-linear-gradient'

const genders: string[] = ['Male', 'Female', 'Other']
const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary
const { hex: primaryHex, rgb: primaryRgb } = Colors.primary

export default memo(({ setVisible }: RadioOptionsPopupProps): JSX.Element => {
   const dispatch = useDispatch()
   const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current
   const { session, metadata } = useSelector((state: AppState) => state.user)
   const userId: string | null = session && session?.user.id || null
   const { gender } = metadata
   const [ currentGender, setCurrentGender ] = useState<string>(gender)

   const onSave = () => {
      Animated.timing(animateValue, {
         toValue: 0, 
         duration: 320, 
         useNativeDriver: true
      }).start(async() => {
         const payload = { gender: currentGender }
         if (userId) {
            const errorMessage: string = await UserService.updatePersonalData(userId, payload)
            return
         }
         dispatch(updateMetadata(payload))
         setVisible(false)
      })
   }

   return (
      <Popup {...{
         type: 'centered',
         width: hS(280),
         title: 'Gender',
         animateValue,
         setVisible 
      }}>
      {
         genders.map((e, i) => 
            <Pressable 
               key={i} 
               style={{...styles.option, marginTop: i === 0 ? 0 : vS(33) }}
               onPress={() => setCurrentGender(e)}>
               <Text style={styles.optionText}>{e}</Text>
               <View style={styles.circleBound}>
               { 
                  currentGender === e && 
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
            onPress={onSave}
            activeOpacity={.7}
            style={styles.button}>
            <LinearGradient
               style={styles.buttonBg}
               colors={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]}
               start={{ x: .5, y: 0 }}
               end={{ x: .5, y: 1 }}>
               <Text style={styles.buttonText}>Save</Text>
            </LinearGradient>
         </TouchableOpacity>
      </Popup>
   )
})

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
   },

   button: {
      width: '100%',
      height: vS(82),
      borderRadius: hS(32),
      overflow: 'hidden',
      marginTop: vS(20)
   },

   buttonBg: {
      width: '100%',
      height: '100%',
      justifyContent: 'center', 
      alignItems: 'center'
   }, 

   buttonText: {
      fontFamily: 'Poppins-SemiBold', 
      fontSize: hS(14), 
      color: '#fff', 
      letterSpacing: .2
   }
})