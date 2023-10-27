import {
   useEffect,
   useRef,
   memo
} from 'react'

import {
   View,
   Text,
   FlatList,
   TouchableOpacity,
   StyleSheet,
   Animated,
   Dimensions,
   Platform,
   StatusBar
} from 'react-native'

import { 
   updateSurveyIndex,
   updateGoal,
   updateFastingFamiliar,
   updateExercisePerformance,
   updateGender,
   updateAge,
   updateCurrentHeight,
   updateCurrentWeight,
   updateGoalWeight
} from '../store/survey'

import { AppState } from '../store'
import { useDispatch, useSelector } from 'react-redux'
import { useDeviceBottomBarHeight } from '@hooks/useDeviceBottomBarHeight'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import ValueWheelPicker from '@components/shared/value-wheel-picker'
import Button from '@components/shared/button/Button'
import MeasureInput from '@components/shared/measure-input'
import LinearGradient from 'react-native-linear-gradient'
import { NavigationProp } from '@react-navigation/native'
import SurveyOption from '@components/survey-option'

const { hex: darkHex } = Colors.darkPrimary
const { hex: primaryHex, rgb: primaryRgb } = Colors.primary

const SCREEN_WIDTH: number = Dimensions.get('window').width
const PADDING_SIDE: number = hS(24)
const MAX_CONTENT_WIDTH: number = SCREEN_WIDTH - (PADDING_SIDE * 2)

const surveyTitles: Array<string> = [
   'Choose your goal',
   'How familiar are you with fasting?',
   'How often do you exercise?',
   'How old are you?',
   'Let us know your gender',
   'Your current height?',
   'Your current weight?',
   'Your goal weight?'
]

const ExercisePerformanceSurvey = memo(() => {
   const exercisePerformanceData = [
      { id: 2, title: 'Usually' },
      { id: 3, title: '1 time / week' },
      { id: 4, title: '1 time / month'},
      { id: 5, title: 'Never' }
   ]
   return (
      <View style={styles.surveyPart}>
         <Text style={styles.optionsTitle}>Choose one option</Text>
         <FlatList
            style={styles.options}
            showsVerticalScrollIndicator={false}
            data={exercisePerformanceData}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item, index }) =>
               <SurveyOption {...{ 
                  item: item.title, 
                  index,
                  stateKey: 'exercisePerformance', 
                  action: updateExercisePerformance 
               }} />
            }
         />
      </View>
   )
})

const GenderSurvey = memo(() => {
   const genderData = [
      { id: 1, title: 'Male' },
      { id: 2, title: 'Female' },
      { id: 3, title: 'Other' },
   ]
   return (
      <View style={styles.surveyPart}>
         <Text style={styles.optionsTitle}>Choose one option</Text>
         <FlatList
            style={styles.options}
            showsVerticalScrollIndicator={false}
            data={genderData}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item, index }) =>
               <SurveyOption {...{ 
                  item: item.title, 
                  index,
                  stateKey: 'gender', 
                  action: updateGender
               }} />
            }
         />
      </View>
   )
})

const GoalWeightSurvey = memo(() => {
   const dispatch = useDispatch()
   const goalWeight = useSelector((state: AppState) => state.survey.goalWeight)
   return (
      <View style={[styles.surveyPart, { paddingTop: vS(220), alignItems: 'center' }]}>
         <MeasureInput 
            symb='kg' 
            value={goalWeight.toString()}
            contentCentered 
            additionalStyles={{ marginLeft: hS(10) }} 
            onChangeText={(t: string) => dispatch(updateGoalWeight(Number(t)))}
         />
      </View>
   )
})

const CurrentWeightSurvey = memo(() => {
   const dispatch = useDispatch()
   const currentWeight = useSelector((state: AppState) => state.survey.currentWeight)
   return (
      <View style={[styles.surveyPart, { paddingTop: vS(220), alignItems: 'center' }]}>
         <MeasureInput 
            symb='kg' 
            value={currentWeight.toString()}
            contentCentered 
            additionalStyles={{ marginLeft: hS(10) }} 
            onChangeText={(t: string) => dispatch(updateCurrentWeight((Number(t))))}
         />
      </View>
   )
})

const CurrentHeightSurvey = memo(() => {
   const dispatch = useDispatch()
   const currentHeight = useSelector((state: AppState) => state.survey.currentHeight)
   return (
      <View style={[styles.surveyPart, { paddingTop: vS(220), alignItems: 'center' }]}>
         <MeasureInput 
            symb='cm' 
            value={currentHeight.toString()}
            contentCentered 
            additionalStyles={{ marginLeft: hS(10) }}
            onChangeText={(t: string) => dispatch(updateCurrentHeight((Number(t))))}
         />
      </View>
   )
})

const AgeSurvey = memo(() => {
   const dispatch = useDispatch()
   const ageNumbers: Array<number> = Array.from({ length: 120 }, (_, i) => i + 1)
   return (
      <View style={styles.surveyPart}>
         <ValueWheelPicker 
            items={ageNumbers} 
            itemHeight={vS(72)} 
            onIndexChange={(index) => dispatch(updateAge(ageNumbers[index]))} />
      </View>
   )
})

const FastingFamiliarSurvey = memo(() => {
   const fastingFamiliarData = [
      { id: 2, title: 'Beginner' },
      { id: 3, title: 'Intermediate' },
      { id: 4, title: 'Pro Faster' }
   ]
   return (
      <View style={styles.surveyPart}>
         <Text style={styles.optionsTitle}>Choose one option</Text>
         <FlatList
            style={styles.options}
            showsVerticalScrollIndicator={false}
            data={fastingFamiliarData}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item, index }) =>
               <SurveyOption {...{ 
                  item: item.title, 
                  index,
                  stateKey: 'fastingFamiliar', 
                  action: updateFastingFamiliar 
               }} />
            }
         />
      </View>
   )
})

const GoalSurvey = memo(() => {
   const goalSurveyData = [
      { id: 2, title: 'Lose weight' },
      { id: 3, title: 'Live longer' },
      { id: 4, title: 'Be energetic' },
      { id: 5, title: 'Gut rest' }
   ]
   return (
      <View style={styles.surveyPart}>
         <Text style={styles.optionsTitle}>Choose multiple options</Text>
         <FlatList
            style={styles.options}
            showsVerticalScrollIndicator={false}
            data={goalSurveyData}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item, index }) =>
               <SurveyOption {...{ 
                  item: item.title, 
                  index,
                  stateKey: 'goal', 
                  action: updateGoal
               }} />
            }
         />
      </View>
   )
})

const surveyComponents = [
   GoalSurvey, 
   FastingFamiliarSurvey, 
   ExercisePerformanceSurvey, 
   AgeSurvey,
   GenderSurvey,
   CurrentHeightSurvey,
   CurrentWeightSurvey, 
   GoalWeightSurvey
]

export default ({ navigation }: { navigation?: NavigationProp<any> }): JSX.Element => {
   const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current
   const dispatch = useDispatch()
   const surveyIndex = useSelector((state: AppState) => state.survey.surveyIndex)
   const bottomBarHeight: number = useDeviceBottomBarHeight()

   useEffect(() => {
      Animated.timing(animateValue, {
         toValue: 1,
         duration: 920,
         useNativeDriver: true
      }).start()
   }, [surveyIndex])

   const changeSurvey = (newSurveyIndex: number) => {
      if (newSurveyIndex === surveyTitles.length && navigation) {
         navigation.navigate('survey-loading')
         return
      }
      Animated.timing(animateValue, {
         toValue: 0, 
         duration: 920, 
         useNativeDriver: true
      }).start(({ finished }) => { dispatch(updateSurveyIndex(newSurveyIndex)) })
   }

   const SurveyComponent = surveyComponents[surveyIndex]

   return (
      <View style={[styles.container, { paddingBottom: vS(27) + bottomBarHeight }]}>
         <View>
            <View style={styles.indicator}>
            {
               Array.from({ length: surveyTitles.length }).map((e, i) => {
                  const currentStyles = [
                     styles.indicatorPart,
                     { marginLeft: i > 0 ? 4 : 0, backgroundColor: '#f3f3f3' }
                  ]
                  return i <= surveyIndex && (
                     <LinearGradient
                        key={i}
                        style={currentStyles}
                        colors={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]}
                        start={{ x: .5, y: 0 }}
                        end={{ x: .5, y: 1 }}
                     /> ||
                     <View key={i} style={currentStyles} />
                  )
               })
            }
            </View>
            <Animated.Text style={[
               styles.mainTitle, 
               {
                  opacity: animateValue, 
                  transform: [{ translateX: animateValue.interpolate({
                     inputRange: [0, 1], 
                     outputRange: [-150, 0]
                  }) }]
               }
            ]}>
               {surveyTitles[surveyIndex]}
            </Animated.Text>
            <Animated.View style={[styles.surveysContainer, { 
               opacity: animateValue, 
               transform: [{ translateX: animateValue.interpolate({
                  inputRange: [0, 1], 
                  outputRange: [-300, 0]
               }) }]
            }]}>
               <SurveyComponent />
            </Animated.View>
         </View>
         <Animated.View 
            style={[
               styles.bottom, 
               {
                  opacity: animateValue, 
                  transform: [{ translateX: animateValue.interpolate({
                     inputRange: [0, 1], 
                     outputRange: [-150, 0]
                  }) }]
               }
            ]}>
            {
               surveyIndex > 0 &&
               <TouchableOpacity style={styles.backButton} onPress={() => changeSurvey(surveyIndex - 1)}>
                  <Text style={styles.backButtonText}>Back to previous</Text>
               </TouchableOpacity>
            }
            <Button
               title={surveyIndex === surveyTitles.length - 1 && 'Submit' || 'Next'}
               size='large'
               bgColor={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]}
               onPress={() => changeSurvey(surveyIndex + 1)}
            />
         </Animated.View>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'space-between',
      backgroundColor: '#fff',
      paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0
   },

   indicator: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: vS(25),
      alignSelf: 'flex-start',
      paddingHorizontal: PADDING_SIDE
   },

   indicatorPart: {
      height: vS(10),
      borderRadius: 50
   },

   backButton: {
      width: '100%',
      height: vS(76),
      backgroundColor: '#f3f3f3',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: hS(32),
      marginBottom: vS(21)
   },

   mainTitle: {
      alignSelf: 'flex-start',
      fontFamily: 'Poppins-SemiBold',
      fontSize: hS(24),
      marginTop: vS(22),
      color: darkHex,
      paddingHorizontal: PADDING_SIDE
   },

   backButtonText: {
      fontFamily: 'Poppins-Medium',
      color: darkHex,
      fontSize: hS(14)
   },

   options: {
      marginTop: vS(10)
   },

   optionsTitle: {
      fontFamily: 'Poppins-Medium',
      fontSize: hS(14), 
      color: '#9f9f9f'
   },

   surveysContainer: {
      marginTop: vS(14)
   },

   surveyPart: {
      width: MAX_CONTENT_WIDTH,
      marginLeft: PADDING_SIDE
   },

   bottom: { paddingHorizontal: PADDING_SIDE }
})

