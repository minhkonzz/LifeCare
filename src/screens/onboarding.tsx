import {
	View,
	Text,
	Image,
	StyleSheet
} from 'react-native'

import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import Button from '@components/shared/button/Button'
import Screen from '@components/shared/screen'

const darkPrimary: string = Colors.darkPrimary.hex

export default (): JSX.Element => {
	return (
		<Screen full scroll paddingHorzContent>
			<Image style={styles.storySet} source={require('../assets/images/storyset/onboarding.gif')} />
			<View style={styles.centerChildHorizontal}>
				<Text style={styles.mainTitle}>Narutal and healthy</Text>
				<Text style={styles.description}>{'Intermittent Fasting is a natural way to\nstay fit and healthy'}</Text>
			</View>
			<Button title='Next' size='large' bgColor={[`rgba(${Colors.primary.rgb.join(', ')}, .6)`, Colors.primary.hex]} />
		</Screen>
	)
}

const styles = StyleSheet.create({
	centerChildHorizontal: {
		flex: 1,
		alignItems: 'center'
	},

	storySet: {
		width: hS(392),
		height: vS(392),
		marginBottom: vS(24)
	},

	mainTitle: {
		fontSize: hS(21),
		fontFamily: 'Poppins-SemiBold',
		color: darkPrimary
	},

	description: {
		marginTop: vS(28),
		fontSize: hS(16),
		textAlign: 'center',
		lineHeight: hS(28),
		fontFamily: 'Poppins-Medium',
		color: '#8A8A8A'
	}
})
