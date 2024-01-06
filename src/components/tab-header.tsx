import { View, Text, StyleSheet, Pressable } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { useNavigation } from '@react-navigation/native'
import { darkHex } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale  as vS } from '@utils/responsive'
import { WatercupIcon } from '@assets/icons'
import { useSelector } from 'react-redux'
import { AppStore } from '../store'

interface TabHeaderProps {
	title?: string
}

export default ({ title }: TabHeaderProps): JSX.Element => {
	const navigation = useNavigation<any>()
	const drinked: number = useSelector((state: AppStore) => state.water.drinked)
	const { dailyWater, firstTimeTrackWater } = useSelector((state: AppStore) => state.user.metadata)

	return (
		<View style={styles.container}>
			<View style={styles.temp} />
			<Text style={styles.title}>{title}</Text>
			<View style={styles.watercupWrapper}>
				<AnimatedCircularProgress
					lineCap='round'
					width={hS(4)}
					size={hS(45)}
					rotation={360}
					fill={Math.floor(drinked / dailyWater * 100)}
					tintColor='#91C8E4'
					backgroundColor='#E3E3E3' />
				<View style={styles.watercupInside}>
					<Pressable onPress={() => navigation.navigate(firstTimeTrackWater && 'water-overview' || 'water')}>
						<WatercupIcon width={hS(14)} height={vS(19)} />
					</Pressable>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	temp: {
		width: hS(52),
		height: vS(40)
	},

	container: {
		position: 'absolute',
		backgroundColor: '#fff',
		width: '100%',
		paddingHorizontal: hS(24),
		paddingVertical: vS(12),
		alignItems: 'center',
		justifyContent: 'space-between',
		borderBottomLeftRadius: hS(25),
		borderBottomRightRadius: hS(25),
		elevation: 10,
		shadowColor: darkHex
	},

	title: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(18),
		color: darkHex,
		letterSpacing: .5, 
		marginTop: vS(-32)
	},

	watercupWrapper: {
		width: hS(45), 
		height: vS(45),
		justifyContent: 'center',
		alignItems: 'center', 
		padding: 2,
		alignSelf: 'flex-end',
		marginTop: vS(-40) 
	}, 

	watercupInside: {
		position: 'absolute'
	}
})
