import { useContext } from 'react'
import { useSelector } from 'react-redux'
import {
	View,
	Text,
	StyleSheet,
	Pressable,
	Image
} from 'react-native'
import { useDispatch } from 'react-redux'
import { updateNewPlan } from '../store/fasting'
import { PopupContext } from '@contexts/popup'
import { Colors } from '@utils/constants/colors'
import { AppState } from '../store'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import RestaurantIcon from '@assets/icons/restaurant.svg'
import ElectroIcon from '@assets/icons/electro.svg'
import RequireEndFastingPopup from '@components/shared/popup-content/require-end-fasting'
import ConfirmPopup from '@components/shared/popup-content/ask-start-fasting'

const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary

export default ({ item }): JSX.Element => {
	const { startTimeStamp, endTimeStamp } = useSelector((state: AppState) => state.fasting)
	const { setPopup } = useContext(PopupContext)
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
				<View style={{ marginTop: vS(16) }}>
					<View style={styles.hrsDescWrapper}>
						<ElectroIcon width={hS(8)} height={vS(10)} />
						<Text style={styles.hrsDesc}>{`${item.hrs_fast} hours for fasting`}</Text>
					</View>
					<View style={[styles.hrsDescWrapper, { marginTop: vS(5) }]}>
						<RestaurantIcon width={hS(9)} height={vS(9)} />
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
		width: hS(257),
		height: vS(148),
		elevation: 4,
		shadowColor: `rgba(${darkRgb.join(', ')}, .5)`,
		backgroundColor: '#fff',
		borderRadius: hS(32),
		paddingTop: vS(16),
		paddingLeft: hS(18),
		paddingRight: hS(11),
		paddingBottom: vS(10),
		marginLeft: hS(24),
		marginTop: vS(4)
	},

	planCategory: {
		fontFamily: 'Poppins-Regular',
		fontSize: hS(8),
		color: `rgba(${darkRgb.join(', ')}, .6)`,
		letterSpacing: .2
	},

	planName: {
		fontFamily: 'Poppins-Medium',
		fontSize: hS(24),
		color: darkHex,
		letterSpacing: .2,
		marginTop: vS(4)
	},

	hrsDesc: {
		marginLeft: hS(6),
		fontFamily: 'Poppins-Regular',
		fontSize: hS(9),
		color: darkHex,
		letterSpacing: .2
	},

	hrsDescWrapper: {
		flexDirection: 'row',
		alignItems: 'center'
	},

   planDaysDecor: {
		width: hS(80),
		height: vS(80),
		alignSelf: 'flex-end'
	}
})
