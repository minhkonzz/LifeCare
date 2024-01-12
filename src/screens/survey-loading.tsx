import { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { darkHex } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { useSelector, useDispatch } from 'react-redux'
import { updateMetadata } from '@store/user'
import { AppStore } from '../store'
import { InitialPersonalData, PersonalData } from '@utils/interfaces'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { GOOGLE_AI_KEY } from '@env'
import useSession from '@hooks/useSession'
import UserService from '@services/user'
import LottieView from 'lottie-react-native'

export default (): JSX.Element => {
   const dispatch = useDispatch()
   const navigation = useNavigation<any>()
   const { isOnline } = useSelector((state: AppStore) => state.network)
   const { userId } = useSession()
   const survey = useSelector((state: AppStore) => state.survey)

   const {
      age, 
      gender,
      currentHeight,
      currentWeight, 
      goalWeight, 
      exercisePerformance,
      fastingFamiliar,
      goal, 
      firstMealTime,
      lastMealTime,
      healthConcerns
   } = survey

   const getPrompt = () => {
      return `
         I'm ${fastingFamiliar} with Fasting diet, 
         I want to know what fasting plan is right for me if my height is ${currentHeight} centimeter, 
         my current weight is ${currentWeight} kg, 
         my goal weight is ${goalWeight} kg, 
         my goal are ${goal.join(', ')}.
         My gender is ${gender}, 
         I'm ${age} years old, 
         I sleep about 9 hours every night, 
         I have ${exercisePerformance} with exercise,
         My first meal time is at ${firstMealTime},
         My last meal time is at ${lastMealTime},
         I'm having ${healthConcerns.join(', ')}.
         I want the response includes: fasting_plan_name (string), daily_water (number and value in ml), daily_calories (number), other_tips (array), advise (string), plan_explain (string). Response text must be a valid JSON string
      `
   }

   const initPersonalData = async () => {
      let recommendation = null
      let dailyWater = 2500

      if (isOnline) {
         const genAI = new GoogleGenerativeAI(GOOGLE_AI_KEY)
         const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
         const prompt = getPrompt()
         const ans = await model.generateContent(prompt)
         const res = ans.response.text()
         const startIndex = res.indexOf('{')
         const endIndex = res.lastIndexOf('}')
         const subRes = res.substring(startIndex, endIndex + 1)
         const recommendResult = JSON.parse(subRes)
         if (recommendResult) {
            recommendation = recommendResult
            const { daily_water } = recommendResult
            if (daily_water) dailyWater = daily_water
         }
      }

      let isOk: boolean = false
      let initPersonalData: InitialPersonalData = {
         gender,
         age,
         currentHeight,
         currentWeight,
         startWeight: currentWeight,
         goalWeight,
         exercisePerformance,
         fastingFamiliar,
         goal,
         firstMealTime,
         lastMealTime,
         healthConcerns,
         isSurveyed: true
      }   

      if (!userId) {
         // user logged in as guest
         const personalData: PersonalData = {
            ...initPersonalData,
            firstTimeTrackWater: true, 
            chestMeasure: 0,
            thighMeasure: 0,
            waistMeasure: 0,
            hipsMeasure: 0, 
            dailyWater,
            dailyCarbs: 0,
            dailyFat: 0,
            dailyProtein: 0,
            name: '',
            email: '',
            startTimeStamp: 0,
            endTimeStamp: 0,
            currentPlanId: '',
            waterRecords: [],
            fastingRecords: [], 
            bodyRecords: []
         }
         dispatch(updateMetadata(personalData))
         isOk = true
      } else {
         const { status } = await UserService.initPersonalData(userId, initPersonalData)
         dispatch(updateMetadata({
            waterRecords: [],
            fastingRecords: [],
            bodyRecords: []
         }))

         if (status === 204) isOk = true
      }
      if (isOk) navigation.navigate('fasting-definitions', recommendation)
   }

   useEffect(() => {
      initPersonalData()
   }, [])

   return (
      <View style={styles.container}>
         <LottieView 
            style={styles.lottie}
            source={require('../assets/lottie/lottie-loading.json')}
            autoPlay 
            loop />
         <Text style={styles.lgText}>We're setting up for you</Text>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1, 
      justifyContent: 'center',
      alignItems: 'center', 
      backgroundColor: '#fff'
   }, 

   lottie: {
      width: 200, 
      height: 200
   },

   texts: {
      marginTop: vS(100), 
      alignItems: 'center'
   },

   lgText: {
      fontFamily: 'Poppins-Medium', 
      fontSize: hS(24), 
      color: darkHex, 
      lineHeight: vS(36)
   }
})
