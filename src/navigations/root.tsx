import { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../store'
import { updateNetworkOnline } from '../store/network'
import { updateSession, updateMetadata } from '../store/user'
import { supabase } from '@configs/supabase'
import { convertObjectKeysToCamelCase } from '@utils/helpers'
import { PersonalData } from '@utils/interfaces'
import UserService from '@services/user'
import Stack from './stack'
import NetInfo from '@react-native-community/netinfo'

export default (): JSX.Element => {
   const dispatch = useDispatch()
   const _session: any = useSelector((state: AppState) => state.user.session)

   useEffect(() => {
      let channel: any

      const netInfoUnsubscribe = NetInfo.addEventListener(state => {
         dispatch(updateNetworkOnline(state.isConnected))
      })

      const { data: supabaseAuthListener } = supabase.auth.onAuthStateChange(async(event, session) => {
         if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') dispatch(updateSession(session))
         if (_session) {
            const userId: string = _session.user.id
            const response: PersonalData = await UserService.getPersonalData(userId)
            dispatch(updateMetadata(convertObjectKeysToCamelCase(response)))
         }
         if (!channel) {
            channel = supabase.channel('schema-db-changes')
            .on('postgres_changes', {
               event: 'UPDATE',
               schema: 'public',
               table: 'users'
            }, (payload: any) => { 
               dispatch(updateMetadata(convertObjectKeysToCamelCase(payload.new)))
            }).subscribe()
         }
      })

      return () => {
         netInfoUnsubscribe()
         supabaseAuthListener.subscription.unsubscribe()
      }
   }, [])

   return (
      <NavigationContainer>
         <Stack />
      </NavigationContainer>
   )
}