import { View, Text, StyleSheet, Pressable } from 'react-native'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import BackIcon from '@assets/icons/goback.svg'

interface SettingPartProps {
	title: string,
	onPress?: () => void,
	value?: number | string,
	toggle?: boolean
}

export default ({ title, onPress, value, toggle = false }: SettingPartProps): JSX.Element => {
	return (
		<Pressable {...{ style: styles.container, onPress }}>
			<Text style={[styles.text, styles.title]}>{title}</Text>
			{
				toggle &&
				<Text>Toggle</Text> ||
				<View style={styles.value}>
					{ value && <Text style={[styles.text, styles.valueText]}>{value}</Text> }
					<BackIcon {...{
						width: hS(7),
						height: vS(12.2),
						style: { transform: [{ rotate: '180deg' }] }
					}} />
				</View>
			}
		</Pressable>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},

	title: {
		color: Colors.darkPrimary.hex
	},

	value: {
		flexDirection: 'row',
		alignItems: 'center'
	},

	valueText: {
		marginTop: 4,
		marginRight: hS(14),
		color: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .6)`
	},

	text: {
		fontFamily: 'Poppins-Regular',
		fontSize: hS(14)
	}
})
