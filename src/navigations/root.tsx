import { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { updateNetworkOnline } from '../store/network'
import { updateSession } from '../store/user'
import { supabase } from '@configs/supabase'
import Stack from './stack'
import BottomTabs from './bottom-tabs'
import Profile from '@screens/profile'
import NetInfo from '@react-native-community/netinfo'

export default (): JSX.Element => {
   const dispatch = useDispatch()

   useEffect(() => {
      const netInfoUnsubscribe = NetInfo.addEventListener(state => {
         dispatch(updateNetworkOnline(state.isConnected))
      })
      const { data: supabaseAuthListener } = supabase.auth.onAuthStateChange(async(event, session) => {
         dispatch(updateSession(session))
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
      // <Profile />
   )
}