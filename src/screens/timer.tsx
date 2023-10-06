import { View, Text, StyleSheet, Animated, Pressable } from 'react-native'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import BackIcon from '@assets/icons/goback.svg'
import Button from '@components/shared/button/Button'
import TabHeader from '@components/tab-header'
import FastingClock from '@components/fasting-clock'
import FastingActivator from '@components/fasting-activator'
import FastingRecords from '@components/FastingRecords'
import Screen from '@components/shared/screen'

const darkPrimary: string = Colors.darkPrimary.hex

export default (): JSX.Element => {
	return (
		<>
			<Screen scroll paddingHorzContent>
				<View style={styles.mainTop}>
					<Text style={styles.mainTopTitle}>You're fasting now</Text>
					<View style={styles.plans}>
						<Pressable style={styles.plansBox}>
							<Text style={styles.plansBoxText}>16:8 Intermittent Fasting plan</Text>
							<BackIcon
								style={{ transform: [{ rotate: '-90deg' }], marginLeft: hS(9.7) }}
								width={hS(5)}
								height={vS(10)}
							/>
						</Pressable>
						<Pressable style={styles.planRef} onPress={() => { }}>
							<Text style={styles.planRefText}>?</Text>
						</Pressable>
					</View>
				</View>
				<FastingClock />
				<FastingActivator />
				<FastingRecords />
			</Screen>
			<TabHeader title='Timer' />
		</>
	)
}

const styles = StyleSheet.create({
	mainTop: {
		alignItems: 'center',
		marginTop: vS(35),
		marginBottom: vS(30)
	},

	mainTopTitle: {
		fontFamily: 'Poppins-Bold',
		fontSize: hS(22),
		letterSpacing: .5,
		color: darkPrimary
	},

	plans: {
		flexDirection: 'row',
		alignItems: 'center',
		marginLeft: hS(36),
		marginTop: vS(18)
	},

	plansBox: {
		borderRadius: 72,
		backgroundColor: '#fff',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: vS(12),
		paddingHorizontal: hS(13),
		elevation: 14,
		shadowColor: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .3)`
	},

	plansBoxText: {
		fontFamily: 'Poppins-Medium',
		fontSize: hS(12),
		color: darkPrimary,
		letterSpacing: .2
	},

	planRef: {
		width: hS(22),
		height: vS(22),
		backgroundColor: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .18)`,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 300,
		marginLeft: hS(15)
	},

	planRefText: {
		fontFamily: 'Poppins-Medium',
		fontSize: hS(12),
		color: darkPrimary
	}
})
