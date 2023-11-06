import { memo, Dispatch, SetStateAction, useRef } from 'react'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import Popup from '../popup'
import LinearGradient from 'react-native-linear-gradient'
import WheelPicker from '../wheel-picker'
import {
   Text,
   TouchableOpacity,
   StyleSheet,
   Animated
} from 'react-native'

const { hex: primaryHex, rgb: primaryRgb } = Colors.primary
const ageNumbers: Array<number> = Array.from({ length: 120 }, (_, i) => i + 1)

const Main = ({
   animateValue, 
   setVisible
}: {
   animateValue: Animated.Value,
   setVisible: Dispatch<SetStateAction<boolean>>
}) => {

   const onSave = () => {
      Animated.timing(animateValue, {
         toValue: 0, 
         duration: 320, 
         useNativeDriver: true
      }).start(({ finished }) => {
         setVisible(false)
      })
   }

   return (
      <>
         <WheelPicker items={ageNumbers} itemHeight={vS(72)} />
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
      </>
   )
}

export default memo(({ setVisible }: { setVisible: Dispatch<SetStateAction<boolean>> }) => {
   const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current

   return (
      <Popup {...{
         type: 'centered',
         title: 'Age',
         width: hS(332),
         animateValue,
         setVisible         
      }}>
         <Main {...{ animateValue, setVisible }} />
      </Popup>
   )
})

const styles = StyleSheet.create({
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