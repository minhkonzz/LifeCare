import { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { updateNetworkOnline } from '../store/network'
import { updateSession, updateMetadata } from '../store/user'
import { supabase } from '@configs/supabase'
import { convertObjectKeysToCamelCase } from '@utils/helpers'
import Stack from './stack'
import NetInfo from '@react-native-community/netinfo'

export default (): JSX.Element => {
   const dispatch = useDispatch()

   useEffect(() => {
      let changes: any

      const netInfoUnsubscribe = NetInfo.addEventListener(state => {
         dispatch(updateNetworkOnline(state.isConnected))
      })

      const { data: supabaseAuthListener } = supabase.auth.onAuthStateChange(async(event, session) => {
         if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
            let _session: any
            if (event === 'SIGNED_IN') {
               
            }
            dispatch(updateSession(session))
         }
         if (!changes) {
            changes = supabase.channel('schema-db-changes')
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