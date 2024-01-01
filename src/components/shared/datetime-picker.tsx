import { memo, useCallback, useMemo, useState, useRef, Dispatch, SetStateAction } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { getDatesRange, getMonthTitle } from '@utils/datetimes'
import { darkRgb, primaryHex, primaryRgb } from '@utils/constants/colors'
import LinearGradient from 'react-native-linear-gradient'
import Popup from './popup'
import WheelPicker from './wheel-picker'

const dateOpts = getDatesRange(8)
const hoursOpts = Array.from({ length: 24 }).map((e, i) => i)
const minsOpts = Array.from({ length: 60 }).map((e, i) => i)

const Picker = memo(({
   items,
   onIndexChange,
   styles,
   initialScrollIndex = 0
}: {
   items: string[] | number[],
   onIndexChange: (index: number) => void,
   styles: any,
   initialScrollIndex?: number
}): JSX.Element => {
   return ( 
      <View style={styles}>
         <WheelPicker {...{
            items,
            itemHeight: vS(45),
            fs: hS(18),
            onIndexChange,
            initialScrollIndex
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
   onSave?: (date: string, hours: number, mins: number) => Promise<void>
}): JSX.Element => {

   const memorizedDatetime = useMemo(() => {
      const d: Date = new Date()
      const hour: number = d.getHours()
      const min: number = d.getMinutes()
      const date: string = `${d.toLocaleString('en-US', { month: 'short' })} ${d.getDate()}`
      return { currentDate: date, currentHour: hour, currentMin: min }
   }, [])

   const { currentDate, currentHour, currentMin } = memorizedDatetime

   const [ date, setDate ] = useState<string>(currentDate)
   const [ hours, setHours ] = useState<number>(currentHour)
   const [ mins, setMins ] = useState<number>(currentMin)

   const onConfirm = () => {
      Animated.timing(animateValue, {
         toValue: 0, 
         duration: 320, 
         useNativeDriver: true
      }).start(async() => {
         if (onSave) await onSave(date, hours, mins)
         setVisible(false)
      })
   }

   const setNewDate = useCallback((i: number) => {
      const { month, date: dateOpt } = dateOpts[i]
      setDate(`${getMonthTitle(month, true)} ${dateOpt}`)
   }, [])

   const setNewHours = useCallback((i: number) => {
      setHours(hoursOpts[i])
   }, [])

   const setNewMins = useCallback((i: number) => {
      setMins(minsOpts[i])
   }, [])

   const WheelPickers = useCallback(memo(() => {
      const currentDateIndex: number = dateOpts.findIndex(e => {
         const { month, date: dateOpt } = e
         return `${getMonthTitle(month, true)} ${dateOpt}` === date
      })

      const currentHourIndex: number = hoursOpts.findIndex(e => e === hours)
      const currentMinIndex: number = minsOpts.findIndex(e => e === mins)

      return (
         <>
            <Picker 
               items={dateOpts.map(e => e.title)} 
               styles={styles.dateWheelPicker} 
               onIndexChange={setNewDate} 
               initialScrollIndex={currentDateIndex} />

            <Picker 
               items={hoursOpts} 
               styles={styles.hoursWheelPicker} 
               onIndexChange={setNewHours} 
               initialScrollIndex={currentHourIndex} />
            
            <Picker 
               items={minsOpts} 
               styles={styles.minsWheelPicker} 
               onIndexChange={setNewMins} 
               initialScrollIndex={currentMinIndex} />
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

export default memo(({
   setVisible,
   title,
   onSave
}: {
   setVisible: Dispatch<SetStateAction<any>>,
   title: string,
   onSave?: (date: string, hours: number, mins: number) => Promise<void>
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