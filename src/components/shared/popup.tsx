import { memo, ReactNode, Dispatch, SetStateAction, useEffect } from 'react'
import { View, Text, Animated, Pressable, StyleSheet } from 'react-native'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { Colors } from '@utils/constants/colors'
import CloseIcon from '@assets/icons/close.svg'

const darkPrimary: string = Colors.darkPrimary.hex

interface PopupProps {
	type: 'bottomsheet' | 'centered'
	title: string,
	animateValue: Animated.Value,
	setVisible: Dispatch<SetStateAction<ReactNode>>
	width?: number, 
	children?: ReactNode
}

export default memo(({
	type,
	title,
	animateValue,
	setVisible,
	width,
	children
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
			duration: 300,
			useNativeDriver: true
		}).start(({ finished }) => {
			setVisible(null)
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
						width, 
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
				style={[styles.popupCenter, { width, transform: [{ scale: animateValue }] }]}>
				<PopupContent />
			</Animated.View>
		}
		</Animated.View> 
	)
})

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
		alignItems: 'center',
		backgroundColor: '#fff',
		paddingHorizontal: hS(21),
		paddingVertical: vS(16), 
		borderRadius: hS(24)
	},

	header: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingBottom: vS(16)
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
