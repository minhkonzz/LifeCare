import { 
   memo, 
   useState, 
   ReactNode, 
   Dispatch, 
   useRef, 
   SetStateAction 
} from 'react'
import {
   View,
   Text,
   TouchableOpacity,
   Animated,
   StyleSheet
} from 'react-native'
import PrimaryToggleValue from '../primary-toggle-value'
import MeasureInput from '../measure-input'
import Popup from '@components/shared/popup'
import LinearGradient from 'react-native-linear-gradient'
import UserService from '@services/user'
import { useSelector } from 'react-redux'
import { AppState } from '../../../store'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'

const { hex: primaryHex, rgb: primaryRgb } = Colors.primary
const { rgb: darkRgb } = Colors.darkPrimary

const Main = ({ 
   animateValue,
   setVisible  
}: { 
   animateValue: Animated.Value, 
   setVisible: Dispatch<SetStateAction<any>>
}) => {
   const { currentHeight, currentWeight } = useSelector((state: AppState) => state.user.metadata)
   const session = useSelector((state: AppState) => state.user.session) 
   const userId: string | null = session && session.user.id || null
   const [ height, setHeight ] = useState<number>(currentHeight)
   const [ weight, setWeight ] = useState<number>(currentWeight)

   const onSave = () => {
      Animated.timing(animateValue, {
         toValue: 0, 
         duration: 320, 
         useNativeDriver: true
      }).start(async ({ finished }) => {
         await UserService.updateBMI(userId, {
            currentHeight: height, 
            currentWeight: weight
         })
         setVisible(null)
      })
   }

   return (
      <>
         <PrimaryToggleValue additionalStyles={styles.toggle}/>
         <View style={styles.input}>
            <Text style={styles.inputTitle}>Height</Text>
            <MeasureInput 
               contentCentered
               symb='cm' 
               value={height}
               onChangeText={t => setHeight(+t)} />
         </View>
         <View style={styles.input}>
            <Text style={styles.inputTitle}>Weight</Text>
            <MeasureInput
               contentCentered 
               symb='kg' 
               value={weight} 
               onChangeText={t => setWeight(+t)}/>
         </View>
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

export default memo(({ setVisible }: { setVisible: Dispatch<SetStateAction<ReactNode>> }) => {
   const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current

   return (
      <Popup {...{
         type: 'centered', 
         width: hS(315),
         title: 'Height & Weight', 
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
   },

   toggle: { marginVertical: vS(7) },

   input: {
      alignItems: 'center',
      marginVertical: vS(18),
      marginLeft: hS(20)
   },
    
   inputTitle: {
      fontFamily: 'Poppins-Regular', 
      fontSize: hS(14), 
      color: `rgba(${darkRgb.join(', ')}, .8)`, 
      letterSpacing: .2, 
      marginRight: hS(16)
   }
})