import { createStackNavigator } from '@react-navigation/stack'
import BottomTabs from '@navigations/bottom-tabs'
import FastAIOverview from '@screens/fastai-overview'
import FastAIMainChat from '@screens/fastai-mainchat'
import Welcome from '@screens/welcome'
import Splash from '@screens/splash'
import Survey from '@screens/survey'
import Water from '@screens/water'
import WaterSetting from '@screens/water-setting'
import SurveyLoading from '@screens/survey-loading'
import SurveySuggest from '@screens/survey-suggest'
import Setting from '@screens/setting'
import Timeline from '@screens/timeline'
import PersonalData from '@screens/personal-data'
import Reminder from '@screens/reminder'
import FastingPlans from '@screens/plans'
import DayPlan from '@screens/day-plan'
import FastingStages from '@screens/fasting-stages'
import FastingResult from '@screens/fasting-result'
import BodyMeasures from '@screens/body-measures'
import Feedback from '@screens/feedback'
import Goal from '@screens/goal'
import InsightReading from '@screens/insight-reading'
import AddActivity from '@screens/add-activity'
import AddFood from '@screens/add-food'
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
         <Stack.Screen name='fastai-mainchat' component={FastAIMainChat} />
         <Stack.Screen name='plans' component={FastingPlans} />
         <Stack.Screen name='fasting-stages' component={FastingStages} />
         <Stack.Screen name='fasting-result' component={FastingResult} />
         <Stack.Screen name='day-plan' component={DayPlan} />
         <Stack.Screen name='body-measures' component={BodyMeasures} />
         <Stack.Screen name='timeline' component={Timeline} />
         <Stack.Screen name='personal-data' component={PersonalData} />
         <Stack.Screen name='reminder' component={Reminder} />
         <Stack.Screen name='setting' component={Setting} />
         <Stack.Screen name='feedback' component={Feedback} />
         <Stack.Screen name='goal' component={Goal} />
         <Stack.Screen name='insight-reading' component={InsightReading}/>
         <Stack.Screen name='add-activity' component={AddActivity} />
         <Stack.Screen name='add-food' component={AddFood} />
      </Stack.Navigator>
   )
}