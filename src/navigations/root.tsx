import { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../store'
import { updateNetworkOnline } from '../store/network'
import { updateMetadata, updateSession } from '../store/user'
import { supabase } from '@configs/supabase'
import { convertObjectKeysToCamelCase } from '@utils/helpers'
import { PersonalData } from '@utils/interfaces'
import { updateTimes, updateCurrentPlan } from '../store/fasting'
import plansData from '@assets/data/plans.json'
import UserService from '@services/user'
import Stack from './stack'
import NetInfo from '@react-native-community/netinfo'
import TestCarousel from '@screens/test-carousel'

export default (): JSX.Element => {
   // const dispatch = useDispatch()
   // const [ initialized, setInitialized ] = useState<boolean>(false)
   // const prevSession = useSelector((state: AppState) => state.user.session)

   // const initializeUserData = async (userId: string): Promise<void> => {
   //    const isSurveyed = await UserService.checkUserSurveyed(userId)
   //    if (!isSurveyed) return 
   //    const { response, error } = await UserService.getPersonalData(userId)
   //    if (error) console.log('error when get user data (1)')

   //    const { startTimeStamp, endTimeStamp, currentPlanId, ...personalData } = response

   //    if (startTimeStamp && endTimeStamp) 
   //       dispatch(updateTimes({ _start: startTimeStamp, _end: endTimeStamp }))

   //    if (currentPlanId) {
   //       const currentPlan = plansData[0].items.find(e => e.id === currentPlanId)
   //       dispatch(updateCurrentPlan(convertObjectKeysToCamelCase(currentPlan)))
   //    }
      
   //    dispatch(updateMetadata(personalData))
   // }

   // useEffect(() => {
   //    let channel: any

   //    const netInfoUnsubscribe = NetInfo.addEventListener(state => {
   //       dispatch(updateNetworkOnline(state.isConnected))
   //    })

   //    const { data: supabaseAuthListener } = supabase.auth.onAuthStateChange(async(event, session) => {
   //       if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
   //          if (session) {
   //             const userId: string = session.user.id
   //             await initializeUserData(userId)
   //          }
   //          dispatch(updateSession(session))
   //       }
   //       if (prevSession) {
   //          const userId: string = prevSession?.user?.id 
   //          await initializeUserData(userId)
   //       }
   //       if ((prevSession || session) && !channel) {
   //          channel = supabase.channel('schema-db-changes')
   //          .on('postgres_changes', {
   //             event: 'UPDATE',
   //             schema: 'public',
   //             table: 'users'
   //          }, (payload: any) => { 
   //             const convertedResponse = convertObjectKeysToCamelCase(payload.new)
   //             const { startTimeStamp, endTimeStamp, currentPlanId, ...personalData } = convertedResponse

   //             if (startTimeStamp && endTimeStamp) {
   //                dispatch(updateTimes({ _start: startTimeStamp, _end: endTimeStamp }))
   //             }

   //             if (currentPlanId) {
   //                const currentPlan = plansData[0].items.find(e => e.id === currentPlanId)
   //                dispatch(updateCurrentPlan(convertObjectKeysToCamelCase(currentPlan)))
   //             }
               
   //             dispatch(updateMetadata(personalData))
   //          }).subscribe()
   //       }
   //       setInitialized(true)
   //    })

   //    return () => {
   //       netInfoUnsubscribe()
   //       supabaseAuthListener.subscription.unsubscribe()
   //    }
   // }, [])

   // if (!initialized) return <></>

   return (
      // <NavigationContainer>
      //    <Stack />
      // </NavigationContainer>
      <TestCarousel />
   )
}