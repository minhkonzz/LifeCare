import {
	View,
	Text,
	StyleSheet,
	Pressable
} from 'react-native'

import BackIcon from '@assets/icons/goback.svg'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'

interface StackHeaderProps {
	title: string,
	onPressBack?: () => void
}

export default ({ title, onPressBack }: StackHeaderProps): JSX.Element => {
	return (
		<View style={styles.container}>
			<Pressable onPress={onPressBack}>
				<BackIcon width={hS(9.2)} height={vS(16)} />
			</Pressable>
			<Text style={styles.title}>{title}</Text>
			<View />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: vS(16)
	},

	title: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(16),
		color: Colors.darkPrimary.hex,
		letterSpacing: .2
	}
})
