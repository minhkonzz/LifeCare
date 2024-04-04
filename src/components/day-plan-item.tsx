import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { View, Text, StyleSheet, Pressable, Image } from 'react-native'
import { useDispatch } from 'react-redux'
import { updateNewPlan } from '../store/fasting'
import { PopupContext } from '@contexts/popup'
import { darkHex, darkRgb } from '@utils/constants/colors'
import { AppStore } from '../store'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { ElectroIcon, RestaurantIcon } from '@assets/icons'
import RequireEndFastingPopup from '@components/shared/popup/require-end-fasting'
import ConfirmPopup from '@components/shared/popup/ask-start-fasting'

export default ({ item }): JSX.Element => {
	const { startTimeStamp, endTimeStamp } = useSelector((state: AppStore) => state.fasting)
	const { setPopup } = useContext<any>(PopupContext)
	const dispatch = useDispatch()

	const onSelectPlan = () => {
		if (!startTimeStamp || !endTimeStamp) {
			dispatch(updateNewPlan({
				id: item.id,
				name: item.name, 
				sourceText: item.source_text,
				hrsFast: item.hrs_fast,
				hrsEat: item.hrs_eat
			}))
		}
		const Popup = startTimeStamp && endTimeStamp && RequireEndFastingPopup || ConfirmPopup
		setPopup(Popup)
	}

	return (
		<Pressable style={styles.container} onPress={onSelectPlan}>
			<View>
				<Text style={styles.planCategory}>1 day plan</Text>
				<Text style={styles.planName}>{`${item.hrs_fast}-${item.hrs_eat}`}</Text>
				<View style={styles.descs}>
					<View style={styles.hrsDescWrapper}>
						<ElectroIcon width={hS(12)} height={vS(14)} />
						<Text style={styles.hrsDesc}>{`${item.hrs_fast} hours for fasting`}</Text>
					</View>
					<View style={{...styles.hrsDescWrapper, marginTop: vS(5) }}>
						<RestaurantIcon width={hS(14)} height={vS(14)} />
						<Text style={styles.hrsDesc}>{`${item.hrs_eat} hours for eating`}</Text>
					</View>
				</View>
			</View>
			<Image style={styles.planDaysDecor} source={require('../assets/images/plan-num1.png')} />
		</Pressable>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: hS(328),
		height: vS(210),
		elevation: 12,
		shadowColor: `rgba(${darkRgb.join(', ')}, .5)`,
		backgroundColor: '#fff',
		borderRadius: hS(32),
		paddingTop: vS(16),
		paddingLeft: hS(18),
		paddingRight: hS(14),
		paddingBottom: vS(14),
		marginLeft: hS(20),
		marginTop: vS(4)
	},

	descs: {
		marginTop: vS(16)
	},

	planCategory: {
		fontFamily: 'Poppins-Regular',
		fontSize: hS(13),
		color: `rgba(${darkRgb.join(', ')}, .6)`,
		letterSpacing: .2
	},

	planName: {
		fontFamily: 'Poppins-Medium',
		fontSize: hS(36),
		color: darkHex,
		letterSpacing: .2,
		marginTop: vS(4)
	},

	hrsDesc: {
		marginLeft: hS(10),
		fontFamily: 'Poppins-Regular',
		fontSize: hS(12),
		color: darkHex,
		letterSpacing: .2
	},

	hrsDescWrapper: {
		flexDirection: 'row',
		alignItems: 'center'
	},

   planDaysDecor: {
		width: hS(105),
		height: vS(105),
		alignSelf: 'flex-end'
	}
})
