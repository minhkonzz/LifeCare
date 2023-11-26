import { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../store'
import { updateNetworkOnline } from '../store/network'
import { updateMetadata, updateSession } from '../store/user'
import { supabase } from '@configs/supabase'
import { convertObjectKeysToCamelCase } from '@utils/helpers'
import { PersonalData } from '@utils/interfaces'
import UserService from '@services/user'
import Stack from './stack'
import NetInfo from '@react-native-community/netinfo'
import Timeline from '@screens/timeline'

export default (): JSX.Element => {
   // const dispatch = useDispatch()
   // const [ initialized, setInitialized ] = useState<boolean>(false)
   // const prevSession = useSelector((state: AppState) => state.user.session)

   // const initializePersonalData = async (userId: string): Promise<void> => {
   //    const isSurveyed = await UserService.checkUserSurveyed(userId)
   //    if (!isSurveyed) return 
   //    const response: PersonalData = await UserService.getPersonalData(userId)
   //    dispatch(updateMetadata(convertObjectKeysToCamelCase(response)))
   // }

   // useEffect(() => {
   //    let channel: any

   //    const netInfoUnsubscribe = NetInfo.addEventListener(state => {
   //       dispatch(updateNetworkOnline(state.isConnected))
   //    })

   //    const { data: supabaseAuthListener } = supabase.auth.onAuthStateChange(async(event, session) => {
   //       if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
   //          const userId: string = session?.user?.id
   //          await initializePersonalData(userId)
   //          dispatch(updateSession(session))
   //       }
   //       if (prevSession) {
   //          const userId: string = prevSession?.user?.id 
   //          await initializePersonalData(userId)
   //       }
   //       if ((prevSession || session) && !channel) {
   //          channel = supabase.channel('schema-db-changes')
   //          .on('postgres_changes', {
   //             event: 'UPDATE',
   //             schema: 'public',
   //             table: 'users'
   //          }, (payload: any) => { 
   //             dispatch(updateMetadata(convertObjectKeysToCamelCase(payload.new)))
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
   // console.log('render Stack')

   return (
      // <NavigationContainer>
      //    <Stack />
      // </NavigationContainer>
      <Timeline />
   )
}