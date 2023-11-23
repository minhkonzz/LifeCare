import { 
   memo, 
   useState, 
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
import MeasureInput from '../measure-input'
import Popup from '@components/shared/popup'
import LinearGradient from 'react-native-linear-gradient'
import SettingToggleValue from '../setting-toggle-value'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../../../store'
import { updateGoal } from '../../../store/water'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { milliliterToOunce, ounceToMilliliter } from '@utils/fomular'

const symbOptions: [string, string] = ['ML', 'OZ']

const Main = ({ animateValue }: { animateValue: Animated.Value }) => {
   const dispatch = useDispatch()
   const { goal: currentGoal } = useSelector((state: AppState) => state.water)
   const [ goal, setGoal ] = useState<number>(currentGoal)
   const [ toggled, setToggled ] = useState<boolean>(false)
   const [ selectedSymbOption, setSelectedSymbOption ] = useState<string>(symbOptions[Number(toggled)])

   const onSave = () => {
      Animated.timing(animateValue, {
         toValue: 0, 
         duration: 320, 
         useNativeDriver: true
      }).start(({ finished }) => {
         if (goal === currentGoal) return
         dispatch(updateGoal(goal))
      })
   }

   const onChangeSymb = () => {
      const convertFn = toggled && ounceToMilliliter || milliliterToOunce
      setGoal(convertFn(goal))
      setToggled(!toggled)
      setSelectedSymbOption(symbOptions[Number(!toggled)])
   }

   return (
      <>
         <SettingToggleValue value={symbOptions} onPress={onChangeSymb} w={hS(180)} />
         <MeasureInput 
            contentCentered
            symb={selectedSymbOption}
            value={goal} 
            onChangeText={t => setGoal(+t)} 
            additionalStyles={styles.input} />
         <TouchableOpacity
            onPress={onSave}
            activeOpacity={.7}
            style={styles.button}>
            <LinearGradient
               style={styles.buttonBg}
               colors={['rgba(116, 155, 194, .6)', '#749BC2']}
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
         width: hS(300),
         title: 'Goal', 
         animateValue,
         setVisible
      }}>
         <Main {...{ animateValue }} />
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

   input: {
      marginVertical: vS(20), 
      marginLeft: hS(28)
   }
})