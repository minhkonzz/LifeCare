import { memo, useCallback } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { darkRgb } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { formatNum } from '@utils/helpers'
import WheelPicker from './wheel-picker'

let selectedHours: number = 7
let selectedMins: number = 0
const hourOpts = Array.from({ length: 24 }).map((e, i) => ({ title: formatNum(i), value: i }))
const minOpts = Array.from({ length: 60 }).map((e, i) => ({ title: formatNum(i), value: i }))

export default ({ onScrollEnded }: { onScrollEnded: (h: number, m: number) => void }): JSX.Element => {

   const setNewHours = (i: number) => {
      selectedHours = hourOpts[i].value
      onScrollEnded(selectedHours, selectedMins)
   }

   const setNewMins = (i: number) => {
      selectedMins = minOpts[i].value
      onScrollEnded(selectedHours, selectedMins)
   }

   const Main = useCallback(memo(() => {      
      return (
         <View style={styles.container}>
            <View style={styles.indicator} />
            <View style={styles.picker}>
               <WheelPicker 
                  items={hourOpts.map(e => e.title)} 
                  itemHeight={vS(68)} 
                  fs={hS(28)}
                  initialScrollIndex={7}
                  onIndexChange={setNewHours} />
            </View>
            <Text style={styles.tdots}>:</Text>
            <View style={styles.picker}>
               <WheelPicker 
                  items={minOpts.map(e => e.title)} 
                  itemHeight={vS(68)} 
                  fs={hS(28)}
                  initialScrollIndex={0}
                  onIndexChange={setNewMins} />
            </View>
         </View>
      )
   }), [])
   return <Main />
}

const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'center'
   },

   tdots: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: hS(24),
      marginHorizontal: hS(28),
      marginTop: vS(205)
   },

   picker: {
      width: hS(65),
      height: vS(300),
      marginTop: vS(60)
   },

   indicator: {
      width: '100%', 
      height: '18%', 
      backgroundColor: `rgba(${darkRgb.join(', ')}, .1)`, 
      borderRadius: 100,
      position: 'absolute', 
      top: vS(192)    
   }
})