import { 
   memo, 
   useState, 
   ReactNode, 
   Dispatch, 
   useRef, 
   SetStateAction 
} from 'react'
import {
   Text,
   TouchableOpacity,
   Animated,
   StyleSheet
} from 'react-native'
import PrimaryToggleValue from '../primary-toggle-value'
import MeasureInput from '../measure-input'
import Popup from '@components/shared/popup'
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'

const { hex: primaryHex, rgb: primaryRgb } = Colors.primary

export default memo(({ setVisible }: { setVisible: Dispatch<SetStateAction<ReactNode>> }) => {
   const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current
   const [ height, setHeight ] = useState<number>(0)
   const [ weight, setWeight ] = useState<number>(0)

   const onSave = () => {
      Animated.timing(animateValue, {
         toValue: 0, 
         duration: 320, 
         useNativeDriver: true
      }).start()
   }

   return (
      <Popup {...{
         type: 'centered', 
         with: hS(315),
         title: 'Weight', 
         animateValue,
         setVisible
      }}>
         <PrimaryToggleValue />
         <MeasureInput 
            symb='cm' 
            value={!height && '' || height + ''}
            placeholder='Height' />
         <MeasureInput 
            symb='kg' 
            value={!weight && '' || weight + ''} 
            placeholder='Weight' />
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