import { useState } from 'react'
import {
   View,
   StyleSheet,
   Platform,
   StatusBar
} from 'react-native'
import { NavigationProp } from '@react-navigation/native'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { useDeviceBottomBarHeight } from '@hooks/useDeviceBottomBarHeight'
import Login from '@components/signin'
import Register from '@components/signup'

export default ({ navigation }: { navigation: NavigationProp<any> }): JSX.Element => {
   const bottomBarHeight: number = useDeviceBottomBarHeight()
   const [ isLogin, setIsLogin ] = useState<boolean>(true)
   const AuthComponent = isLogin && Login || Register

   return (
      <View style={[styles.container, { paddingBottom: vS(18) + bottomBarHeight }]}>
         <AuthComponent {...{ setIsLogin, navigation }} />
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#fff',
      paddingHorizontal: hS(22),
      paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0
   }
})
