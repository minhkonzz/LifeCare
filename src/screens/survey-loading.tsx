import { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { NavigationProp } from '@react-navigation/native'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { useSelector, useDispatch } from 'react-redux'
import { updateMetadata } from '../store/user'
import { AppState } from '../store'
import { InitialPersonalData } from '@utils/interfaces'
import UserService from '@services/user'
import LottieView from 'lottie-react-native'

const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary

export default ({ navigation }: { navigation: NavigationProp<any> }): JSX.Element => {
   const dispatch = useDispatch()
   const survey = useSelector((state: AppState) => state.survey)
   const session = useSelector((state: AppState) => state.user.session)

   const initPersonalData = async () => {
      let isOk: boolean = false
      const personalData: InitialPersonalData = {
         gender: survey.gender,
         currentHeight: survey.currentHeight,
         currentWeight: survey.currentWeight, 
         startWeight: survey.currentWeight,
         goalWeight: survey.goalWeight,
         age: survey.age, 
         exercisePerformance: survey.exercisePerformance,
         fastingFamiliar: survey.fastingFamiliar,
         goal: survey.goal,
         isSurveyed: true
      }   
      if (!session) {
         // user logged in as guest
         dispatch(updateMetadata(personalData))
         isOk = true
      } else {
         // user logged in account
         const userId = session?.user?.id
         const { status } = await UserService.initPersonalData(userId, personalData)
         if (status === 204) isOk = true
      }
      if (isOk) navigation.navigate('main')
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
         <View style={styles.texts}>
            <Text style={styles.lgText}>We're setting</Text>
            <Text style={styles.lgText}>Everything up for you</Text>
         </View>
         <Text style={styles.smText}>Calculating...</Text>
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
   }, 

   smText: {
      fontFamily: 'Poppins-Medium',
      fontSize: hS(14), 
      color: `rgba(${darkRgb.join(', ')}, .6)`,
      letterSpacing: .2, 
      marginTop: vS(22)
   }
})
