import { memo, ReactNode, Dispatch, SetStateAction, useEffect } from 'react'
import { View, Text, Animated, Pressable, StyleSheet } from 'react-native'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { darkHex } from '@utils/constants/colors'
import { CloseIcon } from '@assets/icons'

interface PopupProps {
	type: 'bottomsheet' | 'centered'
	title: string,
	animateValue: Animated.Value,
	setVisible: Dispatch<SetStateAction<any>>
	width?: number, 
	children?: ReactNode, 
	onSelfClose?: () => void
}

export default memo(({
	type,
	title,
	animateValue,
	setVisible,
	width,
	children,
	onSelfClose
}: PopupProps): JSX.Element => {

	useEffect(() => {
		Animated.timing(animateValue, {
			toValue: 1,
			duration: 300,
			useNativeDriver: true
		}).start()
	}, [])

	const closePopup = () => {
		Animated.timing(animateValue, {
			toValue: 0,
			duration: 320,
			useNativeDriver: true
		}).start(() => {
			if (onSelfClose) onSelfClose()
			setVisible(null)
		})
	}

	const PopupContent = () => {
		return (
			<>
				<View style={styles.header}>
					<Text style={styles.headerTitle}>{title}</Text>
					<Pressable style={styles.closeButton} onPress={closePopup}>
						<CloseIcon width={hS(12)} height={vS(12)} />
					</Pressable>
				</View>
				{ children }
			</>
		)
	}

	return (
		<Animated.View style={{
			...styles.overlay, 
			opacity: animateValue, 
			justifyContent: type === 'bottomsheet' && 'flex-end' || 'center' 
		}}>
			<Pressable style={styles.touchCloseArea} onPress={closePopup} />
			{
				type === 'bottomsheet' && 
				<Animated.View
					style={{
						...styles.bottomSheet,
						width, 
						transform: [{
							translateY: animateValue.interpolate({
								inputRange: [0, 1],
								outputRange: [300, 0]
							})
						}]
					}}>
					<PopupContent />
				</Animated.View> ||
				<Animated.View 
					style={{
						...styles.popupCenter, 
						width, 
						opacity: animateValue.interpolate({
							inputRange: [0, .2, 1], 
							outputRange: [0, 1, 1]
						}),
						transform: [{ translateY: animateValue.interpolate({
							inputRange: [0, 1],
							outputRange: [-50, 0]
						})}] 
					}}>
					<PopupContent />
				</Animated.View>
			}
		</Animated.View> 
	)
})

const styles = StyleSheet.create({

	touchCloseArea: {
		position: 'absolute', 
		top: 0, 
		left: 0, 
		bottom: 0,
		right: 0
	},

	bottomSheet: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: '#fff',
		borderTopLeftRadius: hS(24),
		borderTopRightRadius: hS(24),
		alignItems: 'center',
		paddingHorizontal: hS(24),
		paddingVertical: vS(16)
	},

	popupCenter: {
		alignItems: 'center',
		backgroundColor: '#fff',
		paddingHorizontal: hS(21),
		paddingVertical: vS(16), 
		borderRadius: hS(24)
	},

	header: {
		width: '100%',
		paddingBottom: vS(16)
	},

	headerTitle: {
		alignSelf: 'center',
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(16),
		color: darkHex
	},

	closeButton: {
		width: hS(24), 
		height: vS(12),
		alignSelf: 'flex-end',
		marginTop: vS(-16)
	},

	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0, 0, 0, .5)',
		alignItems: 'center'
	}
})
