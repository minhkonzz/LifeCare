import { memo, useCallback, Dispatch, SetStateAction, useContext } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { darkRgb, primaryHex, primaryRgb } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { WatercupIcon, OrangeWeightIcon } from '@assets/icons'
import { getMonthTitle } from '@utils/datetimes'
import { PopupContext } from '@contexts/popup'
import { useNavigation } from '@react-navigation/native'
import TimelineWeightUpdate from '@components/shared/popup/timeline-weight-update'
import LinearGradient from 'react-native-linear-gradient'

interface TimelineItemProps {
   item?: any 
   index?: any
}

const FastingTimeline = ({ item }: { item: any }) => {
   const navigation = useNavigation<any>()
   console.log('fasting item:', item)

   const onPress = () => {
      navigation.navigate('fasting-result', { item })
   }

   return (
      <View>
         <Pressable {...{ onPress }}>
            <LinearGradient
               style={{ 
                  width: hS(250), 
                  borderRadius: hS(18),
                  padding: hS(14),
                  elevation: 10,
                  shadowColor: `rgba(${darkRgb.join(', ')}, .5)`
               }}
               colors={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]}
               start={{ x: .5, y: 0 }}
               end={{ x: .5, y: 1 }}>
               <Text style={{...styles.name, color: '#fff' }}>{item.plan}</Text>
               <Text style={{...styles.value, color: '#fff', fontSize: hS(22) }}>{item.total}</Text>
               <View style={{
                  width: '100%',
                  borderRadius: hS(10),
                  paddingVertical: vS(8),
                  paddingHorizontal: hS(12),
                  backgroundColor: `rgba(${darkRgb.join(', ')}, .1)`
               }}>
                  <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                     <Text style={{...styles.name, marginBottom: 0, color: '#fff' }}>Start</Text>
                     <Text style={{...styles.name, marginBottom: 0, color: '#fff' }}>{item.start}</Text>
                  </View>
                  <View style={{ width: 1, height: vS(16), borderWidth: .5, borderStyle: 'dashed', marginVertical: vS(2) }} />
                  <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                     <Text style={{...styles.name, marginBottom: 0, color: '#fff' }}>End</Text>
                     <Text style={{...styles.name, marginBottom: 0, color: '#fff' }}>{item.end}</Text>
                  </View>
               </View>
            </LinearGradient>
         </Pressable>
         <View style={{...styles.iconIndicator, marginLeft: hS(14) }} />
      </View>
   )
}

const WaterDrinkTimeline = ({ item }: { item: any }) => {
   return (
      <>
         <View style={styles.iconWrapper}>
            <View style={{...styles.iconBackground,  backgroundColor: 'rgba(177, 234, 238, .28)' }}>
               <WatercupIcon width={hS(17)} height={vS(23.5)} />
            </View>
            <View style={styles.iconIndicator} />
         </View>
         <Pressable style={styles.timelineRight} >
            <Text style={styles.time}>{`${item.hour}:${item.min}`}</Text>
            <View style={styles.detail}>
               <Text style={styles.name}>Drink water</Text>
               <View style={styles.valueWrapper}>
                  <Text style={{...styles.value, color: 'rgba(70, 130, 169, .6)' }}>{`${item.value} ml`}</Text>
                  <Text style={styles.bonus}>2.5</Text>
               </View>
            </View>
         </Pressable>
      </>
   )
}

const WeightTimeline = ({ item }: { item: any }) => {
   const { setPopup } = useContext<any>(PopupContext)

   const UpdatePopup = useCallback(memo(({ setVisible }: { setVisible: Dispatch<SetStateAction<any>> }) =>
      <TimelineWeightUpdate {...{ setVisible, timelineTimeRecord: item }} />
   ), [])

   return (
      <>
         <View style={styles.iconWrapper}>
            <View style={{...styles.iconBackground, backgroundColor: 'rgba(255, 211, 110, .28)' }}>
               <OrangeWeightIcon width={hS(17)} height={vS(23.5)} />
            </View>
            <View style={styles.iconIndicator} />
         </View>
         <Pressable style={{...styles.timelineRight, marginTop: 0 }} onPress={() => setPopup(UpdatePopup)} >
            <View style={styles.detail}>
               <Text style={styles.name}>Weight</Text>
               <View style={styles.valueWrapper}>
                  <Text style={{...styles.value, color: '#FFD36E' }}>{`${item.value} kg`}</Text>
                  <Text style={styles.bonus}>2.5</Text>
               </View>
            </View>
         </Pressable>
      </>
   )
}

const timelineTypes = {
   water: WaterDrinkTimeline,
   weight: WeightTimeline,
   fasting: FastingTimeline
}

export default ({ item, index }: TimelineItemProps): JSX.Element => {
   const TimelineItem = timelineTypes[item.type]

   return (
      <View style={{...styles.container, marginTop: (index > 0 ? vS(12) : 0) }}>
         <Text style={styles.date}>{`${item.day}, ${getMonthTitle(item.month, true)} ${item.date}`}</Text>
         <TimelineItem {...{ item }} />
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flexDirection: 'row' ,
      justifyContent: 'space-between',
      width: hS(370),
      paddingRight: hS(4)
   }, 

   date: {
      width: hS(92),
      marginTop: vS(12),
      fontFamily: 'Poppins-Regular', 
      fontSize: hS(12), 
      color: `rgba(${darkRgb.join(', ')}, .6)`, 
      letterSpacing: .2
   }, 

   iconWrapper: {
      marginLeft: hS(15), 
      marginRight: hS(12), 
      alignItems: 'center'
   }, 

   iconBackground: {
      width: hS(48),
      height: vS(48),
      borderRadius: hS(18), 
      justifyContent: 'center', 
      alignItems: 'center'
   }, 

   iconIndicator: {
      width: hS(3),
      height: vS(72), 
      marginTop: vS(10),
      backgroundColor: `rgba(${darkRgb.join(', ')}, .3)`
   },

   timelineRight: {
      marginTop: vS(12)
   },

   time: {
      fontFamily: 'Poppins-Medium' ,
      fontSize: hS(12), 
      color: `rgba(${darkRgb.join(', ')}, .8)`, 
      letterSpacing: .2, 
      marginBottom: vS(8)
   },

   detail: {
      borderRadius: hS(12), 
      paddingHorizontal: hS(14), 
      paddingVertical: vS(10), 
      width: hS(200),
      elevation: 10, 
      backgroundColor: '#fff', 
      shadowColor: `rgba(${darkRgb.join(', ')}, .5)`
   }, 

   name: {
      fontFamily: 'Poppins-Medium', 
      fontSize: hS(11), 
      color: `rgba(${darkRgb.join(', ')}, .8)`,
      letterSpacing: .2, 
      marginBottom: vS(8)
   }, 

   valueWrapper: {
      flexDirection: 'row', 
      justifyContent: 'space-between',
      alignItems: 'center'
   }, 

   value: {
      fontFamily: 'Poppins-SemiBold', 
      fontSize: hS(14), 
      letterSpacing: .2
   },

   bonus: {
      fontFamily: 'Poppins-Medium', 
      fontSize: hS(9), 
      color: `rgba(${darkRgb.join(', ')}, .6)`, 
      marginTop: vS(4)
   }
})