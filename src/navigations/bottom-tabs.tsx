import { memo, useMemo, useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useSelector, useDispatch } from 'react-redux'
import { getCurrentDate, getLocalDatetimeV2 } from '@utils/datetimes'
import { AppState } from '@store/index'
import { resetDailyWater } from '@store/water'
import { addRec } from '@store/user'
import { autoId } from '@utils/helpers'
import UserService from '@services/user'
import BottomTabs from '@components/bottom-tabs/BottomTabs'
import Profile from '@screens/profile'
import Timer from '@screens/timer'
import Daily from '@screens/daily'
import Insights from '@screens/insights'
import Nutrition from '@screens/nutrition'

const BottomNavigator = createBottomTabNavigator()

const BottomNav = memo(() => {
	const screenOptions = useMemo(() => ({ headerShown: false, unmountOnBlur: true }), [])
	console.log('render BottomNav')
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
})

export default (): JSX.Element => {
	const dispatch = useDispatch()
	const session = useSelector((state: AppState) => state.user.session)
   const userId: string | null = session && session.user.id || null
   const { drinked, changes, date } = useSelector((state: AppState) => state.water)
   const { dailyWater } = useSelector((state: AppState) => state.user.metadata)

	const resetWaterTrack = async () => {
		const todayDate: string = getCurrentDate()
		if (!drinked || todayDate === date) return

		const currentDatetime: string = getLocalDatetimeV2()

		let newWaterRecords = {
			id: autoId('wr'),
			value: drinked,
			goal: dailyWater,
			date,
			createdAt: currentDatetime,
			updatedAt: currentDatetime,
			times: changes.map(e => ({
				id: e.id,
				value: e.liquid,
				createdAt: e.time,
				updatedAt: e.time
			}))
		}

		if (userId) {
			const { waterRecordId, error } = await UserService.savePrevWaterRecords(userId, newWaterRecords)
			if (error || !waterRecordId) {
				console.log('something wrong:', error)
				return
			}
			newWaterRecords['id'] = waterRecordId
		}
		dispatch(addRec({ key: 'waterRecords', rec: newWaterRecords }))
		dispatch(resetDailyWater(todayDate))
	}

	useEffect(() => {
		resetWaterTrack()
	}, [])

	return <BottomNav />
}
