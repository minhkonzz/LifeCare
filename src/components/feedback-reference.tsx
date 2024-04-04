import { View, Text, StyleSheet } from 'react-native'
import { darkHex, darkRgb, primaryHex, primaryRgb } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { useNavigation } from '@react-navigation/native'
import Button from '@components/shared/button/Button'

export default (): JSX.Element => {
	const navigation = useNavigation<any>()

	return (
		<View style={styles.container}>
			<Text style={styles.title}>What else do you want to know?</Text>
			<Button 
				onPress={() => navigation.navigate('feedback')}
				title='Feedback' 
				size='medium' 
				bgColor={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		width: hS(365),
		height: vS(135),
		borderRadius: hS(32),
		elevation: 12,
		shadowColor: `rgba(${darkRgb}, .5)`,
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: vS(22),
		marginTop: vS(36),
		alignSelf: 'center'
	},

	title: {
		color: darkHex,
		fontFamily: 'Poppins-Medium',
		fontSize: hS(14),
		letterSpacing: .2
	}
})
