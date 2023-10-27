import { createStackNavigator } from '@react-navigation/stack'
import BottomTabs from '@navigations/bottom-tabs'
import FastAIOverview from '@screens/fastai-overview'
import Welcome from '@screens/welcome'
import Splash from '@screens/splash'
import Survey from '@screens/survey'
import Water from '@screens/water'
import WaterSetting from '@screens/water-setting'
import SurveyLoading from '@screens/survey-loading'
import SurveySuggest from '@screens/survey-suggest'
import FastingPlans from '@screens/plans'
import DayPlan from '@screens/day-plan'
import FastingStages from '@screens/fasting-stages'
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
         <Stack.Screen name='water' component={Water} />
         <Stack.Screen name='water-setting' component={WaterSetting} />
         <Stack.Screen name='survey-loading' component={SurveyLoading} />
         <Stack.Screen name='survey-suggest' component={SurveySuggest} />
         <Stack.Screen name='splash' component={Splash} />
         <Stack.Screen name='main' component={BottomTabs} />
         <Stack.Screen name='fastai-overview' component={FastAIOverview} />
         <Stack.Screen name='plans' component={FastingPlans} />
         <Stack.Screen name='fasting-stages' component={FastingStages} />
         <Stack.Screen name='day-plan' component={DayPlan} />
      </Stack.Navigator>
   )
}