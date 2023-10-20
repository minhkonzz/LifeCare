import { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { updateNetworkOnline } from '../store/network'
import Stack from './stack'
import NetInfo from '@react-native-community/netinfo'

export default (): JSX.Element => {
   const dispatch = useDispatch()

   useEffect(() => {
      const unsubscribe = NetInfo.addEventListener(state => {
         dispatch(updateNetworkOnline(state.isConnected))
      })
      return () => unsubscribe()
   }, [])

   return (
      <NavigationContainer>
         <Stack />
      </NavigationContainer>
   )
}