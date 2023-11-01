import { useState, useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../store'
import { resetDailyWater } from '../store/water'
import useDatabaseAdapter from '@hooks/useDatabaseAdapter'
import UserService from '@services/user'
import BottomTabs from '@components/bottom-tabs/BottomTabs'
import Profile from '@screens/profile'
import Timer from '@screens/timer'
import Daily from '@screens/daily'
import Insights from '@screens/insights'
import Nutrition from '@screens/nutrition'

const BottomNavigator = createBottomTabNavigator()

export default (): JSX.Element => {
	// const [ isPrepared, setIsPrepared ] = useState(false)
	// const { goal, drinked, changes } = useSelector((state: AppState) => state.water)
	// const isOnline = useSelector((state: AppState) => state.network.isOnline)
	// const session = useSelector((state: AppState) => state.user)
	// const adapter = useDatabaseAdapter(!!(isOnline && session))
	// const dispatch = useDispatch()

	// const resetWaterTrack = async() => {
	// 	dispatch(resetDailyWater(new Date().toLocaleString('en-US', { month: 'short', day: 'numeric' })))
	// 	if (!drinked) return
	// 	await UserService.savePrevWaterRecords(adapter, {
	// 		userId: session.user.id,
	// 		bundled: { goal, drinked, changes }
	// 	})
	// }

	// useEffect(() => {
	// 	resetWaterTrack().then(() => { setIsPrepared(true) })
	// }, [])

	return (
		// isPrepared && 
		<BottomNavigator.Navigator tabBar={props => <BottomTabs {...props} />}>
	   	<BottomNavigator.Group screenOptions={{ headerShown: false }}>
				<BottomNavigator.Screen
		    		options={{ tabBarLabel: 'Daily' }}
		    		name='daily'
		    		component={Daily}
				/>
				<BottomNavigator.Screen 
					options={{ tabBarLabel: 'Timer' }} 
					name='timer'
					component={Timer}
				/>
				<BottomNavigator.Screen 
					options={{ tabBarLabel: 'Nutrition' }}
					name='nutrition'
					component={Nutrition}
				/>
				<BottomNavigator.Screen
					options={{ tabBarLabel: 'Insights' }}
					name='insights'
					component={Insights}
				/>
				<BottomNavigator.Screen
					options={{ tabBarLabel: 'Me' }}
					name='profile'
					component={Profile}
				/>
	    	</BottomNavigator.Group>
		</BottomNavigator.Navigator>
   )
}
