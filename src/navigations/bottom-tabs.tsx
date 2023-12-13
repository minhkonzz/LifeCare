import { useMemo } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import BottomTabs from '@components/bottom-tabs/BottomTabs'
import Profile from '@screens/profile'
import Timer from '@screens/timer'
import Daily from '@screens/daily'
import Insights from '@screens/insights'
import Nutrition from '@screens/nutrition'

const BottomNavigator = createBottomTabNavigator()

export default (): JSX.Element => {
	const screenOptions = useMemo(() => ({ headerShown: false, unmountOnBlur: true }), [])
	return (
		<BottomNavigator.Navigator tabBar={props => <BottomTabs {...props} />}>
	   	<BottomNavigator.Group {...{ screenOptions }}>
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
