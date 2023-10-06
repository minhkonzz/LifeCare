import { View, Text, StyleSheet, Animated, Image } from 'react-native'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'

const darkPrimary: string = Colors.darkPrimary.hex

export default (): JSX.Element => {
	return (
		<View style={styles.container}>
			<Text style={styles.timeText}>15:09:12</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		borderRadius: 500,
		width: hS(320),
		height: vS(320),
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: .2
	},

	timeText: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(36),
		color: darkPrimary,
		letterSpacing: .5
	}
})
