import { ReactNode, useRef, useEffect } from 'react'
import { View, Text, Animated, Pressable, StyleSheet } from 'react-native'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { Colors } from '@utils/constants/colors'
import CloseIcon from '@assets/icons/close.svg'

const darkPrimary: string = Colors.darkPrimary.hex

interface PopupProps {
	type: 'bottomsheet' | 'centered'
	title: string,
	visible?: boolean,
	onClose?: () => void,
	children?: ReactNode
}

export default ({
	type,
	title,
	visible,
	onClose,
	children
}: PopupProps): JSX.Element => {
	const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current

	useEffect(() => {
		if (!visible) return
		Animated.timing(animateValue, {
			toValue: 1,
			duration: 300,
			useNativeDriver: true
		}).start()
	}, [])

	const closePopup = () => {
		if (!visible) return
		Animated.timing(animateValue, {
			toValue: 0,
			duration: 300,
			useNativeDriver: true
		}).start(({ finished }) => {
			if (onClose) onClose()
		})
	}

	const PopupContent = () => {
		return (
			<>
				<View style={styles.header}>
					<View />
					<Text style={styles.headerTitle}>{title}</Text>
					<Pressable onPress={closePopup}>
						<CloseIcon width={hS(10)} height={vS(10)} />
					</Pressable>
				</View>
				{ children }
			</>
		)
	}

	return (
		<>
		{
			visible && 
			<Animated.View style={[
				styles.overlay, 
				{ 
					opacity: animateValue, 
					justifyContent: type === 'bottomsheet' && 'flex-end' || 'center' 
				}
			]}>
			{
				type === 'bottomsheet' && 
				<Animated.View
					style={[
						styles.bottomSheet,
						{
							transform: [{
								translateY: animateValue.interpolate({
									inputRange: [0, 1],
									outputRange: [300, 0]
								})
							}]
						}
					]}>
					<PopupContent />
				</Animated.View> ||
				<Animated.View 
					style={[styles.popupCenter, { transform: [{ scale: animateValue }] }]}>
					<PopupContent />
				</Animated.View>
			}
			</Animated.View> 
		}
		</>
	)
}

const styles = StyleSheet.create({
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
		paddingBottom: vS(27)
	},

	popupCenter: {
		width: hS(300), 
		alignItems: 'center',
		backgroundColor: '#fff',
		paddingHorizontal: hS(21),
		paddingBottom: vS(20), 
		borderRadius: hS(24)
	},

	header: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: vS(16)
	},

	headerTitle: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(16),
		color: darkPrimary
	},

	closeButton: {
		position: 'absolute',
		top: 8,
		right: 8,
		padding: 8
	},

	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0, 0, 0, .5)',
		alignItems: 'center'
	}
})
