import { View, Text, StyleSheet } from 'react-native'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import BackIcon from '@assets/icons/goback.svg'
import InsightItem from './insight-item'

const darkPrimary: string = Colors.darkPrimary.hex

export default (): JSX.Element => {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Most popular</Text>
				<View style={styles.viewall}>
					<Text style={styles.viewallText}>See all</Text>
					<BackIcon style={styles.viewallIcon} width={hS(5)} height={vS(8)} />
				</View>
			</View>
			<InsightItem />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%'
	},

	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: vS(15),
		paddingHorizontal: hS(24)
	},

	title: {
		color: darkPrimary,
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(18),
		letterSpacing: .2
	},

	viewall: {
		flexDirection: 'row',
		alignItems: 'center'
	},

	viewallText: {
		marginRight: hS(10),
		fontFamily: 'Poppins-Regular',
		fontSize: hS(12),
		color: darkPrimary
	},

	viewallIcon: {
		transform: [{ rotate: '180deg' }],
		marginBottom: vS(3)
	}
})
