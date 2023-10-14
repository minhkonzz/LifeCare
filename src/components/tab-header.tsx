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
					style={{ position: 'absolute' }}
					width={hS(3)}
					size={hS(40)}
					rotation={360}
					fill={80}
					tintColor='#91C8E4'
					onAnimationComplete={() => console.log('Animate completed')}
					backgroundColor='#E3E3E3' />
				<WaterCupIcon width={hS(12)} height={vS(18.2)} />
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
		flexDirection: 'row',
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
		letterSpacing: .5
	},

	watercupWrapper: {
		width: hS(40),
		height: vS(40),
		justifyContent: 'center',
		alignItems: 'center'
	}
})
