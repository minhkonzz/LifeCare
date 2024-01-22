import { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Animated, Platform, StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDeviceBottomBarHeight } from '@hooks/useDeviceBottomBarHeight'
import { primaryHex, primaryRgb, darkHex, darkRgb } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { useDispatch, useSelector } from 'react-redux'
import { AppStore } from '../store' 
import { AnimatedPressable } from '@components/shared/animated'
import { CheckmarkIcon } from '@assets/icons'
import { enqueueAction, updateMetadata } from '@store/user'
import { autoId } from '@utils/helpers'
import { NETWORK_REQUEST_FAILED } from '@utils/constants/error-message'
import { commonStyles } from '@utils/stylesheet'
import withSync from '@hocs/withSync'
import UserService from '@services/user'
import StackHeader from '@components/shared/stack-header'
import Button from '@components/shared/button/Button'
import useSession from '@hooks/useSession'
import useAnimValue from '@hooks/useAnimValue'

const goals = ['Lose weight', 'Live longer', 'Be\nenergetic', 'Improve Health']

export default withSync(({ isOnline }: { isOnline: boolean }): JSX.Element => {
   const dispatch = useDispatch()
   const navigation = useNavigation<any>()
   const bottomBarHeight: number = useDeviceBottomBarHeight()
   const animateValue = useAnimValue(0)
   const { metadata } = useSelector((state: AppStore) => state.user)
   const { userId } = useSession()
   const { goal } = metadata
   const [ selectedGoal, setSelectedGoal ] = useState<string[]>(goal)

   useEffect(() => {
      Animated.timing(animateValue, {
         toValue: 1,
         duration: 320,
         useNativeDriver: true
      }).start()
   }, [])

   const onSelectGoal = (goal: string) => {
      setSelectedGoal(selectedGoal.includes(goal) ? selectedGoal.filter(e => e !== goal) : [...selectedGoal, goal])
   }

   const onSave = async () => {
      const payload = { goal }

      const cache = () => {
         dispatch(updateMetadata(payload))
         if (userId && !isOnline) {
            dispatch(enqueueAction({
               userId,
               actionId: autoId('qaid'),
               invoker: 'updatePersonalData',
               name: 'UPDATE_GOAL',
               params: [userId, payload]
            }))
         }
      }

      if (userId) {
         const errorMessage: string = await UserService.updatePersonalData(userId, { goal })
         if (errorMessage === NETWORK_REQUEST_FAILED) cache()
         return
      }
      else cache()
      navigation.goBack()
   }

   return (
      <View style={{...styles.container, paddingBottom: vS(27) + bottomBarHeight }}>
         <View style={commonStyles.wfull}>
            <StackHeader title='Your goal' />
            <View style={styles.goals}>
            {
               goals.map((e, i) => 
                  <AnimatedPressable onPress={() => onSelectGoal(e)} key={i} style={{
                     ...styles.goal, 
                     marginLeft: i % 2 ? hS(17) : 0,
                     marginTop: i > 1 ? vS(22) : 0,
                     opacity: animateValue,
                     transform: [{ scale: animateValue }],
                     ...selectedGoal.includes(e) ? {
                        borderWidth: 1,
                        borderColor: primaryHex
                     } : {}
                  }}>
                     <Text style={styles.goalText}>{e}</Text>
                     { selectedGoal.includes(e) && <CheckmarkIcon style={styles.checkmark} width={hS(32)} height={vS(32)} /> }
                  </AnimatedPressable>
               )
            }
            </View>
         </View>
         <Button 
            title='Save' 
            bgColor={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]} 
            size='large' 
            onPress={onSave}/>
      </View>
   )
})

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'space-between',
      paddingHorizontal: hS(24),
      alignItems: 'center', 
      backgroundColor: '#fff',
      paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0
   },

   goals: {
      flexDirection: 'row', 
      flexWrap: 'wrap',
      marginTop: vS(18)
   },

   goal: {
      width: hS(174),
      height: vS(140),
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: '#fff',
      elevation: 16, 
      shadowColor: `rgba(${darkRgb.join(', ')}, .6)`,
      borderRadius: hS(24)
   }, 

   goalText: {
      width: hS(110),
      fontFamily: 'Poppins-SemiBold',
      fontSize: hS(18),
      color: darkHex, 
      letterSpacing: .2,
      lineHeight: vS(28),
      textAlign: 'center'
   },

   checkmark: {
      position: 'absolute',
      top: vS(10),
      right: hS(10)
   }
})