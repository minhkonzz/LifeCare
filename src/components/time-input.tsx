import { Dispatch, SetStateAction } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { darkHex, darkRgb } from '@utils/constants/colors'

interface TimeInputProps {
	hours: number 
	mins: number
	setMins: Dispatch<SetStateAction<number>>
	setHours: Dispatch<SetStateAction<number>>
}

export default ({ hours, mins, setMins, setHours }: TimeInputProps): JSX.Element => {
	return (
		<View style={styles.container}>
			<View style={styles.numberInput}>
				<TextInput 
					style={styles.input} 
					keyboardType='numeric' 
					maxLength={2} 
					value={hours && hours + '' || ''}
					onChangeText={t => setHours(Number(t))}
				/>
			</View>
			<Text style={styles.timeAbbrevia}>h</Text>
			<Text style={styles.colon}>:</Text>
			<View style={styles.numberInput}>
				<TextInput 
					style={styles.input} 
					keyboardType='numeric' 
					maxLength={2} 
					value={mins && mins + '' || ''}
					onChangeText={t => setMins(Number(t))}
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
		borderBottomColor: `rgba(${darkRgb.join(', ')}, .3)`
	},

	input: {
		marginBottom: vS(-32),
		color: darkHex,
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
		color: darkHex
	},

	colon: {
		fontSize: hS(22),
		fontFamily: 'Poppins-Bold',
		color: darkHex,
		marginBottom: vS(-12)
	}
})
