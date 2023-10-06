import { View, Text, Image, Animated, StyleSheet } from 'react-native'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import Button from '@components/shared/button/Button'
import Screen from '@components/shared/screen'

const darkPrimary: string = Colors.darkPrimary.hex

export default (): JSX.Element => {
	return (
		<Screen full paddingHorzContent>
			<View style={styles.horizontalCentered}>
				<Image style={styles.fastAIInterface} source={require('../assets/lottie/FastAIBotInterface.gif')} />
				<Text style={styles.mainTitle}>AI-based assistant for health care</Text>
			</View>
			<View style={styles.horizontalCentered}>
				<Text style={styles.smallTitle}>{`Lorem ipsum is simly dummy text of the\nprinting and typesetting industry`}</Text>
				<Button title='Start' size='large' bgColor={[`rgba(${Colors.primary.rgb.join(', ')}, .6)`, Colors.primary.hex]} />
			</View>
		</Screen>
	)
}

const styles = StyleSheet.create({
	fastAIInterface: {
		width: hS(400),
		height: vS(412)
	},

	mainTitle: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(28),
		color: darkPrimary,
		letterSpacing: .2,
		marginTop: vS(-32),
		textAlign: 'center'
	},

	smallTitle: {
		textAlign: 'center',
		lineHeight: 21,
		fontFamily: 'Poppins-Medium',
		fontSize: hS(14),
		color: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .8)`,
		letterSpacing: .2,
		marginBottom: vS(40)
	},

	horizontalCentered: {
		alignItems: 'center'
	}
})
