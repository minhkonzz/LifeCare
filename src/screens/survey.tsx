import { memo, useMemo, useState, useEffect, useContext, Dispatch, SetStateAction } from 'react'

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

import { updateSurveyIndex, submitSurveyOption } from '../store/survey'
import { PopupContext } from '@contexts/popup'
import { AppStore } from '../store'
import { useDispatch, useSelector } from 'react-redux'
import { useDeviceBottomBarHeight } from '@hooks/useDeviceBottomBarHeight'
import { darkHex, primaryHex, primaryRgb } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { formatNum } from '@utils/helpers'
import { commonStyles } from '@utils/stylesheet'
import SurveyOption from '@components/survey-option'
import TimeWheelPicker from '@components/shared/time-wheel-picker'
import ValueWheelPicker from '@components/shared/value-wheel-picker'
import Button from '@components/shared/button/Button'
import MeasureInput from '@components/shared/measure-input'
import DoctorAdvisePopup from '@components/shared/popup/doctor-advise'
import useAnimValue from '@hooks/useAnimValue'

const SCREEN_WIDTH: number = Dimensions.get('window').width
const PADDING_SIDE: number = hS(24)
const MAX_CONTENT_WIDTH: number = SCREEN_WIDTH - (PADDING_SIDE * 2)
const { errorText } = commonStyles

const surveyTitles: Array<{ title: string, error: string }> = [
   { title: 'Choose your goal', error: 'Please choose at least 1 option' },
   { title: 'How familiar are you with fasting?', error: 'Please choose option' },
   { title: 'How often do you exercise?', error: 'Please choose option' },
   { title: 'How old are you?', error: '' },
   { title: 'Let us know your gender', error: 'Please choose option' },
   { title: 'Your current height?', error: 'Height is invalid' },
   { title: 'Your current weight?', error: 'Weight is invalid' },
   { title: 'Your goal weight?', error: 'Weight is invalid' },
   { title: 'When do you usually eat the first meal of the day?', error: '' },
   { title: 'When do you usually eat the last meal of the day?', error: '' },
   { title: 'Any health concerns?', error: '' }
]

const withSelectOptions = (surveyData: Array<{id: number, title: string}>, stateKey: string, title: string) => {
   return memo(({ error, setError }: { error: string, setError: Dispatch<SetStateAction<string>> }) => {
      const data = useMemo(() => surveyData, [])
      console.log('render:', stateKey)

      return (
         <View style={styles.surveyPart}>
            <Text style={styles.optionsTitle}>{title}</Text>
            { error && <Text style={errorText}>{error}</Text> }
            <FlatList
               {...{ data }}
               style={styles.options}
               showsVerticalScrollIndicator={false}
               keyExtractor={item => item.id.toString()}
               renderItem={({ item, index }) =>
                  <SurveyOption {...{ 
                     item: item.title, 
                     index, 
                     stateKey,
                     setError 
                  }} />
               }
            />
         </View>
      )
   })
}

const withBodySurvey = (k: string, symb: string) => {
   return memo(({ error, setError }: { error: string, setError: Dispatch<SetStateAction<string>> }) => {
      const dispatch = useDispatch()
      const value = useSelector((state: AppStore) => state.survey[k])

      const onChangeText = (t: string) => {
         if (error) setError('')
         dispatch(submitSurveyOption({ k, v: Number(t) }))
      }

      return (
         <View style={{...styles.surveyPart, paddingTop: vS(220), alignItems: 'center' }}>
            <MeasureInput 
               {...{ symb, onChangeText, value: value + '' }}
               contentCentered 
               additionalStyles={{ marginLeft: hS(10) }}
            />
            { error && <Text style={{...errorText, marginTop: vS(10) }}>{error}</Text> }
         </View>
      )
   })
}

const FirstMealTimeSurvey = memo(() => {
   const dispatch = useDispatch()

   const onScrollEnded = (h: number, m: number) => {
      dispatch(submitSurveyOption({ 
         k: 'firstMealTime', 
         v: `${formatNum(h)}:${formatNum(m)}`
      }))
   }

   return (
      <View style={styles.surveyPart}>
         <TimeWheelPicker {...{ onScrollEnded }} />
      </View>
   )
})

const LastMealTimeSurvey = memo(() => {
   const dispatch = useDispatch()

   const onScrollEnded = (h: number, m: number) => {
      dispatch(submitSurveyOption({ 
         k: 'lastMealTime', 
         v: `${formatNum(h)}:${formatNum(m)}`
      }))
   }

   return (
      <View style={styles.surveyPart}>
         <TimeWheelPicker {...{ onScrollEnded }} />
      </View>
   )
})

const HealthConcernsSurvey = withSelectOptions(
   [
      { id: 2, title: "Cancer" },
      { id: 3, title: 'Diabetes' },
      { id: 4, title: 'Under weight'},
      { id: 5, title: 'Stress / Anxity' },
      { id: 6, title: 'Under 18 years old' }
   ],
   'healthConcerns',
   "Choose multiple options, or leave if don't have any of these"
)

const ExercisePerformanceSurvey = withSelectOptions(
   [
      { id: 2, title: 'Usually' },
      { id: 3, title: '1 time / week' },
      { id: 4, title: '1 time / month'},
      { id: 5, title: 'Never' }
   ],
   'exercisePerformance',
   'Choose one option'
)

const GenderSurvey = withSelectOptions(
   [
      { id: 1, title: 'Male' },
      { id: 2, title: 'Female' }
   ],
   'gender',
   'Choose one option'
)

const GoalWeightSurvey = withBodySurvey('goalWeight', 'kg')
const CurrentWeightSurvey = withBodySurvey('currentWeight', 'kg')
const CurrentHeightSurvey = withBodySurvey('currentHeight', 'cm')

const AgeSurvey = memo(() => {
   const dispatch = useDispatch()
   const ageNumbers: Array<number> = useMemo(() => Array.from({ length: 120 }, (_, i) => i + 1), [])
   return (
      <View style={styles.surveyPart}>
         <ValueWheelPicker 
            items={ageNumbers} 
            itemHeight={vS(72)}
            fs={hS(28)} 
            initialScrollIndex={20}
            onIndexChange={(index) => dispatch(submitSurveyOption({ k: 'age', v: ageNumbers[index] }))} />
      </View>
   )
})

const FastingFamiliarSurvey = withSelectOptions(
   [
      { id: 2, title: 'Beginner' },
      { id: 3, title: 'Intermediate' },
      { id: 4, title: 'Pro Faster' }
   ],
   'fastingFamiliar',
   'Choose one option'
)

const GoalSurvey = withSelectOptions(
   [
      { id: 2, title: 'Lose weight' },
      { id: 3, title: 'Live longer' },
      { id: 4, title: 'Be energetic' },
      { id: 5, title: 'Gut rest' }
   ],
   'goal',
   'Choose multiple options'
)

const surveyComponents = [
   GoalSurvey, 
   FastingFamiliarSurvey, 
   ExercisePerformanceSurvey, 
   AgeSurvey,
   GenderSurvey,
   CurrentHeightSurvey,
   CurrentWeightSurvey, 
   GoalWeightSurvey, 
   FirstMealTimeSurvey,
   LastMealTimeSurvey,
   HealthConcernsSurvey
]

export default (): JSX.Element => {
   const dispatch = useDispatch()
   const animateValue = useAnimValue(0)
   const bottomBarHeight: number = useDeviceBottomBarHeight()
   const [ error, setError ] = useState<string>('')
   const { setPopup } = useContext<any>(PopupContext)
   const { surveyIndex, ...surveys } = useSelector((state: AppStore) => state.survey)
   const surveyValues = Object.values(surveys)

   useEffect(() => {
      Animated.timing(animateValue, {
         toValue: 1,
         duration: 480,
         useNativeDriver: true
      }).start()
   }, [surveyIndex])

   const changeSurvey = (newSurveyIndex: number) => {
      if (newSurveyIndex === surveyTitles.length) {
         setPopup(DoctorAdvisePopup)
         return
      }

      if (newSurveyIndex > surveyIndex) {
         const v = surveyValues[surveyIndex]
         const errorText: string = (
            typeof v === 'string' && !v || 
            Array.isArray(v) && surveyIndex !== surveyValues.length - 1 && v.length === 0 || 
            typeof v === 'number' && (!v || surveyIndex === 4 && v >= 500 || surveyIndex === 5 && v >= 300 || surveyIndex === 6 && v >= 300)
         ) && surveyTitles[surveyIndex].error || ''      

         if (errorText) {
            setError(errorText)
            return
         }  
      }

      Animated.timing(animateValue, {
         toValue: 0, 
         duration: 480, 
         useNativeDriver: true
      }).start(() => { dispatch(updateSurveyIndex(newSurveyIndex)) })
   }

   const SurveyComponent = surveyComponents[surveyIndex]

   return (
      <View style={{...styles.container, paddingBottom: vS(27) + bottomBarHeight }}>
         <View>
            <Animated.Text style={{
               ...styles.mainTitle, 
               opacity: animateValue, 
               transform: [{ translateX: animateValue.interpolate({
                  inputRange: [0, 1], 
                  outputRange: [-50, 0]
               }) }]
            }}>
               { surveyTitles[surveyIndex].title }
            </Animated.Text>
            <Animated.View style={{
               ...styles.surveysContainer,
               opacity: animateValue, 
               transform: [{ translateX: animateValue.interpolate({
                  inputRange: [0, 1], 
                  outputRange: [-50, 0]
               }) }]
            }}>
               <SurveyComponent {...{ error, setError }} />
            </Animated.View>
         </View>
         <Animated.View 
            style={{
               ...styles.bottom, 
               opacity: animateValue, 
               transform: [{ translateX: animateValue.interpolate({
                  inputRange: [0, 1], 
                  outputRange: [-50, 0]
               }) }]
            }}>
            {
               surveyIndex > 0 &&
               <TouchableOpacity style={styles.backButton} onPress={() => changeSurvey(surveyIndex - 1)}>
                  <Text style={styles.backButtonText}>Back to previous</Text>
               </TouchableOpacity>
            }
            <Button
               title={surveyIndex === surveyTitles.length - 1 && 'View plan' || 'Next'}
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

