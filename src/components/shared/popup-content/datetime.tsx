import {
   useState, 
   useCallback,
   memo, 
   Dispatch, 
   SetStateAction, 
   useRef
} from 'react'
import {
   View, 
   Text,
   StyleSheet, 
   TouchableOpacity,
   Animated
} from 'react-native'
import Popup from '../popup'
import LinearGradient from 'react-native-linear-gradient'
import WheelPicker from '../wheel-picker'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { toTimestampV1, getDatesRange } from '@utils/datetimes'

const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary
const { hex: primaryHex, rgb: primaryRgb } = Colors.primary

const dateOpts = getDatesRange(8)
const hoursOpts = Array.from({ length: 24 }).map((e, i) => i)
const minsOpts = Array.from({ length: 60 }).map((e, i) => i)

const Picker = memo(({ 
   items, 
   onIndexChange, 
   styles
}: { 
   items: string[] | number[], 
   onIndexChange?: (index: number) => void, 
   styles?: { width: number } 
}) => {
   console.log('render Picker component')
   return (
      <View style={styles}>
         <WheelPicker {...{
            items,
            itemHeight: vS(45), 
            fs: hS(18),
            onIndexChange
         }} />
      </View>
   )
})

const Main = ({ 
   animateValue, 
   onConfirm
}: { 
   animateValue: Animated.Value, 
   onConfirm?: (timestamp: number) => void
}) => {
   const [ date, setDate ] = useState<string>('')
   const [ hours, setHours ] = useState<number>(0)
   const [ mins, setMins ] = useState<number>(0)

   const onPressConfirm = () => {
      Animated.timing(animateValue, {
         toValue: 0, 
         duration: 300, 
         useNativeDriver: true
      }).start(({ finished }) => {
         const timestamp = toTimestampV1(date, hours, mins)
         if (onConfirm) onConfirm(timestamp)
      })
   }

   const setNewDate = useCallback((index: number) => {
      setDate(dateOpts[index]['value'])
   }, [])

   const setNewHours = useCallback((index: number) => {
      setHours(hoursOpts[index])
   }, [])

   const setNewMins = useCallback((index: number) => {
      setMins(minsOpts[index])
   }, [])

   return (
      <>
         <View style={styles.main}>
            <View style={styles.indicator} />
            <View style={styles.wheelpickers}>
               <Picker items={dateOpts.map(e => e.title)} styles={styles.dateWheelPicker} onIndexChange={setNewDate} />
               <Picker items={hoursOpts} styles={styles.hoursWheelPicker} onIndexChange={setNewHours} />
               <Picker items={minsOpts} styles={styles.minsWheelPicker} onIndexChange={setNewMins} />
            </View>
         </View>
         <TouchableOpacity
            style={styles.button}
            activeOpacity={.7}
            onPress={onPressConfirm}>
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

export default memo(({ 
   setVisible, 
   onConfirm 
}: { 
   setVisible: Dispatch<SetStateAction<boolean>> , 
   onConfirm?: (timestamp: number) => void
}): JSX.Element => {
   const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current

   return (
      <Popup {...{
         type: 'centered', 
         title: 'Start fasting time',
         width: hS(350),
         setVisible, 
         animateValue
      }}>
         <Main {...{ animateValue, onConfirm }} />
      </Popup>
   )
})

const styles = StyleSheet.create({
   main: {
      width: '100%',
      height: vS(225),
      justifyContent: 'center'
   },

   dateWheelPicker: {
      width: hS(160)
   },

   hoursWheelPicker: {
      width: hS(30)
   },

   minsWheelPicker: {
      width: hS(92)
   },

   wheelpickers: {
      position: 'absolute', 
      width: '100%',
      height: '100%',
      flexDirection: 'row', 
      justifyContent: 'space-between'
   },

   indicator: {
      width: '100%', 
      height: '24%', 
      backgroundColor: `rgba(${darkRgb.join(', ')}, .1)`, 
      borderRadius: 100,
      marginBottom: vS(4)
   },

   button: {
      width: '100%', 
      height: vS(82), 
      borderRadius: hS(32), 
      overflow: 'hidden',
      marginTop: vS(20)
   }, 

   buttonBg: {
      justifyContent: 'center', 
      alignItems: 'center', 
      width: '100%',
      height: '100%'
   }, 

   buttonText: {
      fontFamily: 'Poppins-SemiBold', 
      fontSize: hS(14), 
      color: '#fff', 
      letterSpacing: .2
   }
})