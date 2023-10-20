import { createStackNavigator } from '@react-navigation/stack'
import BottomTabs from '@navigations/bottom-tabs'
import FastAIOverview from '@screens/fastai-overview'
import Welcome from '@screens/welcome'
import Splash from '@screens/splash'
import Survey from '@screens/survey'
import Auth from '@screens/auth'

const Stack = createStackNavigator()

export default (): JSX.Element => {
   return (
      <Stack.Navigator
         initialRouteName='splash'
         screenOptions={{ headerShown: false }}>
         <Stack.Screen name='auth' component={Auth}/>
         <Stack.Screen name='welcome' component={Welcome} />
         <Stack.Screen name='survey' component={Survey} />
         <Stack.Screen name='splash' component={Splash} />
         <Stack.Screen name='main' component={BottomTabs} />
         <Stack.Screen name='fastai-overview' component={FastAIOverview} />
      </Stack.Navigator>
   )
}