import { View, Text, StyleSheet } from 'react-native'
import Button from '@components/shared/button/Button'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'

const darkPrimary: string = Colors.darkPrimary.rgb.join(', ')

export default (): JSX.Element => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>What else do you want to know?</Text>
			<Button 
				title='Feedback' 
				size='medium' 
				bgColor={[`rgba(${Colors.primary.rgb.join(', ')}, .6)`, Colors.primary.hex]}
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
		shadowColor: `rgba(${darkPrimary}, .5)`,
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: vS(22),
		marginTop: vS(36)
	},

	title: {
		color: `rgb(${darkPrimary})`,
		fontFamily: 'Poppins-Medium',
		fontSize: hS(14),
		letterSpacing: .2
	}
})
