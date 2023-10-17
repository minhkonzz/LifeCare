import { FC } from 'react'
import { View, Text, StyleSheet, Animated, Image } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale  as vS } from '@utils/responsive'
import WaterCupIcon from '@assets/icons/watercup.svg'

interface TabHeaderProps {
	title: string
}

export default ({ title }: TabHeaderProps): JSX.Element => {
	return (
		<View style={styles.container}>
			<View style={{ width: hS(52), height: vS(40) }} />
			<Text style={styles.title}>{title}</Text>
			<View style={styles.watercupWrapper}>
				<AnimatedCircularProgress
					lineCap='round'
					width={hS(4.5)}
					size={hS(45)}
					rotation={360}
					fill={80}
					tintColor='#91C8E4'
					backgroundColor='#E3E3E3' />
				<View style={styles.watercupInside}>
					<WaterCupIcon width={hS(14)} height={vS(19)} />
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		backgroundColor: '#fff',
		width: '100%',
		paddingHorizontal: hS(24),
		paddingVertical: vS(15),
		alignItems: 'center',
		justifyContent: 'space-between',
		borderBottomLeftRadius: hS(25),
		borderBottomRightRadius: hS(25),
		elevation: 5,
		shadowColor: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .5)`
	},

	title: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(18),
		color: Colors.darkPrimary.hex,
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
