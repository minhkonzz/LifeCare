import { memo, useState, useEffect, useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../store'
import { updateTimes, updateCurrentPlan } from '../store/fasting'
import { updateNetworkOnline } from '../store/network'
import { updateMetadata, updateSession } from '../store/user'
import { supabase } from '@configs/supabase'
import { convertObjectKeysToCamelCase } from '@utils/helpers'
import PopupProvider, { PopupContext } from '@contexts/popup'
import plansData from '@assets/data/plans.json'
import UserService from '@services/user'
import NetInfo from '@react-native-community/netinfo'
import BottomTabs from '@navigations/bottom-tabs'
import FastAIOverview from '@screens/fastai-overview'
import FastAIMainChat from '@screens/fastai-mainchat'
import Welcome from '@screens/welcome'
import Splash from '@screens/splash'
import Survey from '@screens/survey'
import Water from '@screens/water'
import WaterOverview from '@screens/water-overview'
import WaterSetting from '@screens/water-setting'
import SurveyLoading from '@screens/survey-loading'
import SurveySuggest from '@screens/survey-suggest'
import Setting from '@screens/setting'
import Timeline from '@screens/timeline'
import PersonalData from '@screens/personal-data'
import Reminder from '@screens/reminder'
import FastingPlans from '@screens/plans'
import DayPlan from '@screens/day-plan'
import FastingStages from '@screens/fasting-stages'
import FastingResult from '@screens/fasting-result'
import BodyMeasures from '@screens/body-measures'
import Feedback from '@screens/feedback'
import Goal from '@screens/goal'
import InsightReading from '@screens/insight-reading'
import AddActivity from '@screens/add-activity'
import AddFood from '@screens/add-food'
import Auth from '@screens/auth'

const Stack = createStackNavigator()

const StackNav = memo((): JSX.Element => {
   return (
      <Stack.Navigator
         initialRouteName='splash'
         screenOptions={{ headerShown: false }}>
         <Stack.Screen name='auth' component={Auth}/>
         <Stack.Screen name='welcome' component={Welcome} />
         <Stack.Screen name='survey' component={Survey} />
         <Stack.Screen name='water' component={Water} />
         <Stack.Screen name='water-overview' component={WaterOverview} />
         <Stack.Screen name='water-setting' component={WaterSetting} />
         <Stack.Screen name='survey-loading' component={SurveyLoading} />
         <Stack.Screen name='survey-suggest' component={SurveySuggest} />
         <Stack.Screen name='splash' component={Splash} />
         <Stack.Screen name='main' component={BottomTabs} />
         <Stack.Screen name='fastai-overview' component={FastAIOverview} />
         <Stack.Screen name='fastai-mainchat' component={FastAIMainChat} />
         <Stack.Screen name='plans' component={FastingPlans} />
         <Stack.Screen name='fasting-stages' component={FastingStages} />
         <Stack.Screen name='fasting-result' component={FastingResult} />
         <Stack.Screen name='day-plan' component={DayPlan} />
         <Stack.Screen name='body-measures' component={BodyMeasures} />
         <Stack.Screen name='timeline' component={Timeline} />
         <Stack.Screen name='personal-data' component={PersonalData} />
         <Stack.Screen name='reminder' component={Reminder} />
         <Stack.Screen name='setting' component={Setting} />
         <Stack.Screen name='feedback' component={Feedback} />
         <Stack.Screen name='goal' component={Goal} />
         <Stack.Screen name='insight-reading' component={InsightReading}/>
         <Stack.Screen name='add-activity' component={AddActivity} />
         <Stack.Screen name='add-food' component={AddFood} />
      </Stack.Navigator>
   )
})

const Main = () => {
   const dispatch = useDispatch()
   const { popup: Popup, setPopup } = useContext<any>(PopupContext)
   const [ initialized, setInitialized ] = useState<boolean>(false)
   const { session: prevSession, metadata } = useSelector((state: AppState) => state.user)
   const { isOnline } = useSelector((state: AppState) => state.network)

   const fetchPersonalData = async (userId: string): Promise<void> => {
      const { res, error } = await UserService.getPersonalData(userId)
      if (res && !error) initializeUserData(res)
   }

   const initializeUserData = (res: any) => {
      const { startTimeStamp, endTimeStamp, currentPlanId, ...personalData } = res

      if (startTimeStamp && endTimeStamp) 
         dispatch(updateTimes({ _start: startTimeStamp, _end: endTimeStamp }))

      if (currentPlanId) {
         const currentPlan = plansData[0].items.find(e => e.id === currentPlanId)
         dispatch(updateCurrentPlan(convertObjectKeysToCamelCase(currentPlan)))
      }
      
      dispatch(updateMetadata(personalData))
   }

   useEffect(() => {
      let channel: any

      const netInfoUnsubscribe = NetInfo.addEventListener(state => {
         dispatch(updateNetworkOnline(state.isConnected))
      })

      const { data: supabaseAuthListener } = supabase.auth.onAuthStateChange(async(event, session) => {
         if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
            if (session) {
               const userId: string = session.user.id
               const { isSurveyed, error } = await UserService.checkUserSurveyed(userId)
               if (isSurveyed && !error) await fetchPersonalData(userId)
            }
            dispatch(updateSession(session))
         }
         if (prevSession) {
            const { isSurveyed } = metadata
            if (isSurveyed && isOnline) {
               const userId: string = prevSession.user.id 
               await fetchPersonalData(userId)
            }
         }
         const currentSession = prevSession || session
         if (currentSession && !channel) {
            const userId: string = currentSession.user.id
            channel = supabase.channel('schema-db-changes')
            .on('postgres_changes', {
               event: 'UPDATE',
               schema: 'public',
               table: 'users',
               filter: `id=eq.${userId}`
            }, (payload: any) => { 
               const convertedResponse = convertObjectKeysToCamelCase(payload.new)
               initializeUserData(convertedResponse)
            })
            .subscribe()
         }
         setInitialized(true)
      })

      return () => {
         netInfoUnsubscribe()
         supabaseAuthListener.subscription.unsubscribe()
      }
   }, [])

   if (!initialized) return <></>

   return (
      <>
         <StackNav />
         { Popup && <Popup setVisible={setPopup} /> }
      </>
   )
}

export default (): JSX.Element => {
   return (
      <PopupProvider>
         <Main />
      </PopupProvider>
   )
}