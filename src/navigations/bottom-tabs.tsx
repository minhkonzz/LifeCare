import { memo, useState, useEffect, useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import PopupProvider, { PopupContext } from '@contexts/popup'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../store'
import { resetDailyWater } from '../store/water'
import UserService from '@services/user'
import BottomTabs from '@components/bottom-tabs/BottomTabs'
import Profile from '@screens/profile'
import Timer from '@screens/timer'
import Daily from '@screens/daily'
import Insights from '@screens/insights'
import Nutrition from '@screens/nutrition'

const BottomNavigator = createBottomTabNavigator()

const BottomNav = memo(() => {
	return (
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
})

const Main = () => {
	const { popup: Popup, setPopup } = useContext<any>(PopupContext)

	return (
		<>
			<BottomNav />
			{ Popup && <Popup setVisible={setPopup} /> }
		</>
	)
}

export default (): JSX.Element => {
	const [ isPrepared, setIsPrepared ] = useState<boolean>(false)
	const { drinked, changes } = useSelector((state: AppState) => state.water)
	const dailyWater: number = useSelector((state: AppState) => state.user.metadata.dailyWater)
	const { date: prevDate } = useSelector((state: AppState) => state.water)
	const isOnline = useSelector((state: AppState) => state.network.isOnline)
	const session = useSelector((state: AppState) => state.user.session)
	const userId: string = session && session?.user.id || null
	
	const dispatch = useDispatch()
	console.log('water changes:', changes)

	const resetWaterTrack = async() => {
		const todayDate: string = new Date().toLocaleString('en-US', { month: 'short', day: 'numeric' })
		if (!drinked || todayDate === prevDate) return
		await UserService.savePrevWaterRecords({
			userId, 
			value: drinked,
			goal: dailyWater, 
			changes
		})
		dispatch(resetDailyWater(todayDate))
	}

	useEffect(() => {
		resetWaterTrack().then(() => { setIsPrepared(true) })
	}, [])

	return (
		isPrepared && 
		<View style={styles.root}>
			<PopupProvider>
				<Main />
			</PopupProvider>
		</View> || <></>
   )
}

const styles = StyleSheet.create({
	root: { flex: 1 }
})
