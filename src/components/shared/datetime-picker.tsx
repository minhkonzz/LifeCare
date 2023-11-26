import { memo, useCallback, useState, useRef, Dispatch, SetStateAction } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { getDatesRange } from '@utils/datetimes'
import { Colors } from '@utils/constants/colors'
import LinearGradient from 'react-native-linear-gradient'
import Popup from './popup'
import WheelPicker from './wheel-picker'

const { rgb: darkRgb } = Colors.darkPrimary
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
   onIndexChange: (index: number) => void,
   styles: any
}): JSX.Element => {
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
   setVisible,
   animateValue, 
   onSave 
}: {
   animateValue: Animated.Value,
   setVisible: Dispatch<SetStateAction<any>>,
   onSave?: (date: string, hours: number, mins: number) => void
}): JSX.Element => {

   const [ date, setDate ] = useState<string>('')
   const [ hours, setHours ] = useState<number>(0)
   const [ mins, setMins ] = useState<number>(0)

   const onConfirm = () => {
      Animated.timing(animateValue, {
         toValue: 0, 
         duration: 320, 
         useNativeDriver: true
      }).start(() => {
         if (onSave) onSave(date, hours, mins)
         setVisible(false)
      })
   }

   const setNewDate = useCallback((i: number) => {
      setDate(dateOpts[i]['value'])
   }, [])

   const setNewHours = useCallback((i: number) => {
      setHours(hoursOpts[i])
   }, [])

   const setNewMins = useCallback((i: number) => {
      setMins(minsOpts[i])
   }, [])

   const WheelPickers = useCallback(memo(() => {
      return (
         <>
            <Picker items={dateOpts.map(e => e.title)} styles={styles.dateWheelPicker} onIndexChange={setNewDate} />
            <Picker items={hoursOpts} styles={styles.hoursWheelPicker} onIndexChange={setNewHours} />
            <Picker items={minsOpts} styles={styles.minsWheelPicker} onIndexChange={setNewMins} />
         </>
      )
   }), [])

   return (
      <>
         <View style={styles.main}>
            <View style={styles.indicator} />
            <View style={styles.wheelpickers}>
               <WheelPickers />
            </View>
         </View>
         <TouchableOpacity
            style={styles.button}
            activeOpacity={.7}
            onPress={onConfirm}>
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

export default ({
   setVisible,
   title,
   onSave
}: {
   setVisible: Dispatch<SetStateAction<any>>,
   title: string,
   onSave?: (date: string, hours: number, mins: number) => void
}) => {
   const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current

   return (
      <Popup {...{
         type: 'centered',
         title, 
         width: hS(350),
         animateValue,
         setVisible
      }}>
         <Main {...{ animateValue, setVisible, onSave }} />
      </Popup>
   )
}

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