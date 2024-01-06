import { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { NavigationProp } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { AppStore } from '../store'
import LottieView from 'lottie-react-native'

export default ({ navigation }: { navigation: NavigationProp<any> }): JSX.Element => {
   const metadata = useSelector((state: AppStore) => state.user.metadata)

   useEffect(() => {
      const routeName = !metadata && 'welcome' || 'main'
      const timeOutId = setTimeout(() => { navigation.navigate(routeName) }, 2800)
      return () => clearTimeout(timeOutId)
   }, [])

   return (
      <View style={styles.container}>
         <LottieView 
            style={styles.lottie}
            source={require('../assets/lottie/lottie-loading.json')}
            autoPlay 
            loop />
      </View>

   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center'
   }, 

   lottie: {
      width: 200, 
      height: 200
   }
})
