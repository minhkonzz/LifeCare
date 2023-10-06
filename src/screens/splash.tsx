import { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { NavigationProp } from '@react-navigation/native'
import LottieView from 'lottie-react-native'

export default ({ navigation }: { navigation: NavigationProp<any> }): JSX.Element => {

   useEffect(() => {
      const timeOutId = setTimeout(() => {
         navigation.navigate('welcome')
      }, 5000)

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
