import { View, Text, TextInput, StyleSheet } from 'react-native'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { Colors } from '@utils/constants/colors'

const darkPrimary: string = Colors.darkPrimary.hex

export default (): JSX.Element => {
	return (
		<View style={styles.container}>
			<View style={styles.numberInput}>
				<TextInput 
					caretHidden 
					style={styles.input} 
					keyboardType='numeric' 
					maxLength={2} 
				/>
			</View>
			<Text style={styles.timeAbbrevia}>h</Text>
			<Text style={styles.colon}>:</Text>
			<View style={styles.numberInput}>
				<TextInput 
					caretHidden 
					style={styles.input} 
					keyboardType='numeric' 
					maxLength={2} 
				/>
			</View>
			<Text style={styles.timeAbbrevia}>m</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: hS(232),
		height: vS(64),
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		marginBottom: vS(45),
		marginTop: vS(23)
	},

	numberInput: {
		borderBottomWidth: 1,
		borderBottomColor: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .3)`
	},

	input: {
		marginBottom: vS(-32),
		color: darkPrimary,
		width: hS(82),
		fontSize: hS(42),
		fontFamily: 'Poppins-Regular',
		textAlign: 'center',
		letterSpacing: 2
	},

	timeAbbrevia: {
		fontFamily: 'Poppins-Medium',
		fontSize: hS(14),
		marginBottom: vS(-9),
		color: darkPrimary
	},

	colon: {
		fontSize: hS(22),
		fontFamily: 'Poppins-Bold',
		color: darkPrimary,
		marginBottom: vS(-12)
	}
})
