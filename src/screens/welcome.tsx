import { View, Text, Image, StyleSheet } from 'react-native'
import { primaryHex, primaryRgb, darkHex } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { useNavigation } from '@react-navigation/native'
import Button from '@components/shared/button/Button'

export default (): JSX.Element => {
	const navigation = useNavigation()
	return (
		<View style={styles.container}>
			<Image style={styles.storyset} source={require('../assets/images/storyset/welcome.gif')} />
			<Text style={styles.title}>{`Welcome to\nLifeCare`}</Text>
			<Button
				title='Get started'
				size='large'
				bgColor={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]}
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
		color: darkHex
	},

	storyset: {
		width: hS(364),
		height: vS(364)
	}
})
