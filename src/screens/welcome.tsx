import {
	View,
	Text,
	Image,
	StyleSheet
} from 'react-native'

import Button from '@components/shared/button/Button'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { NavigationProp } from '@react-navigation/native'

export default ({ navigation }: { navigation: NavigationProp<any> }): JSX.Element => {
	return (
		<View style={styles.container}>
			<Image style={styles.storyset} source={require('../assets/images/storyset/welcome.gif')} />
			<Text style={styles.title}>{`Welcome to\nLifeCare`}</Text>
			<Button
				title='Get started'
				size='large'
				bgColor={[`rgba(${Colors.primary.rgb.join(', ')}, .6)`, Colors.primary.hex]}
				onPress={() => navigation.navigate('onboarding')}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingBottom: vS(27),
		paddingHorizontal: hS(24), 
		paddingTop: vS(22),
		backgroundColor: '#fff'
	},

	title: {
		fontSize: hS(36),
		fontFamily: 'Poppins-Bold',
		textAlign: 'center',
		lineHeight: hS(52),
		color: Colors.darkPrimary.hex
	},

	storyset: {
		width: hS(364),
		height: vS(364)
	}
})
