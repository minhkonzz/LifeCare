import { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { AppStore } from '../store'
import LottieView from 'lottie-react-native'

export default (): JSX.Element => {
   const navigation = useNavigation<any>()
   const { isLoading, metadata } = useSelector((state: AppStore) => state.user)

   useEffect(() => {
      if (!isLoading) {
         const routeName = !metadata && 'welcome' || 'main'
         navigation.navigate(routeName)
      }
   }, [isLoading])

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
