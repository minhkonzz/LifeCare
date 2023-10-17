import { View, Text, StyleSheet, Animated, Image } from 'react-native'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { Circle } from 'react-native-svg'
import FireColorIcon from '@assets/icons/fire-color.svg'

const { hex: primaryHex, rgb: primaryRgb } = Colors.primary
const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary

export default (): JSX.Element => {
	return (
		<View style={styles.container}>
			<View style={styles.main}>
				<Text style={styles.elapsedTime}>{'Elapsed time (60%)'}</Text>
				<Text style={styles.time}>15:27:02</Text>
				<Text style={styles.nextStageTitle}>Next stage</Text>
				<View style={styles.horz}>
					<FireColorIcon width={hS(16)} height={vS(16)} />
					<Text style={styles.nextStageName}>Fat burning</Text>
				</View>
			</View>
			<AnimatedCircularProgress
				lineCap='round'
				width={hS(28)}
				size={hS(320)}
				rotation={360}
				fill={30}
				tintColor={`rgba(${primaryRgb.join(', ')}, .6)`}
				backgroundColor={`rgba(${darkRgb.join(', ')}, .08)`}
				renderCap={({ center }) => <Circle cx={center.x} cy={center.y} r={hS(20)} fill={darkHex} />}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		borderRadius: 500,
		width: hS(320),
		height: vS(320),
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10, 
		backgroundColor: '#fff'
	},

	horz: {
		flexDirection: 'row', 
		alignItems: 'center'
	}, 

	timeText: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(36),
		color: darkHex,
		letterSpacing: .5
	},

	inside: {
		position: 'absolute',
		width: hS(260), 
		height: vS(260), 
		borderRadius: 500, 
		justifyContent: 'center', 
		alignItems: 'center'
	}, 

	main: {
		position: 'absolute',
		width: hS(220), 
		height: vS(220), 
		backgroundColor: '#fff', 
		borderRadius: 500,
		justifyContent: 'center', 
		alignItems: 'center'
	}, 

	elapsedTime: {
		fontFamily: 'Poppins-Medium',
		fontSize: hS(12), 
		color: darkHex
	},

	time: {
		fontFamily: 'Poppins-SemiBold', 
		fontSize: hS(36), 
		color: darkHex, 
		letterSpacing: 2, 
		marginTop: vS(10), 
		marginBottom: vS(5)
	},

	nextStageTitle: {
		fontFamily: 'Poppins-Medium', 
		fontSize: hS(11), 
		color: `rgba(${darkRgb.join(', ')}, .6)`,
		letterSpacing: .2
	},

	nextStageName: {
		fontFamily: 'Poppins-Medium', 
		fontSize: hS(12), 
		color: darkHex, 
		letterSpacing: .2, 
		marginTop: 5, 
		marginHorizontal: hS(6)
	}
})
