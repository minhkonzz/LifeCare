import { memo, useRef } from 'react'
import {
	Animated,
	ListRenderItemInfo,
	NativeScrollEvent,
	NativeSyntheticEvent,
	StyleSheet,
	Text
} from 'react-native'

import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS } from '@utils/responsive'
import { WheelPickerProps } from '@utils/interfaces'

let valueScrolledTo: string | number = -1

export default memo(({ items, itemHeight, fs, onIndexChange }: WheelPickerProps): JSX.Element => {

	const scrollY = useRef<Animated.Value>(new Animated.Value(0)).current

	const momentumScrollEnd = (
		event: NativeSyntheticEvent<NativeScrollEvent>,
	) => {
		const y = event.nativeEvent.contentOffset.y
		const index = Math.round(y / itemHeight)
		const value = items[index]
		if (onIndexChange && valueScrolledTo !== value) {
			valueScrolledTo = value
			onIndexChange(index)
			console.log('value scrolled to:', valueScrolledTo)
		}
	}

	function WheelPickerItem({ item, index }: ListRenderItemInfo<string>) {
		const inputRange: Array<number> = [
			(index - 4) * itemHeight,
			(index - 3) * itemHeight,
			(index - 2) * itemHeight,
			(index - 1) * itemHeight,
			index * itemHeight
		]

		const scale = scrollY.interpolate({
			inputRange,
			outputRange: [.7, .8, 1, .8, .7],
		})

		const opacity = scrollY.interpolate({
			inputRange,
			outputRange: [.4, .7, 1, .7, .4],
			extrapolate: 'clamp'
		})

		const rotateX = scrollY.interpolate({
			inputRange,
			outputRange: ['-36deg', '-24deg', '0deg', '24deg', '36deg'],
			extrapolate: 'clamp'
		})

		return (
			<Animated.View
				style={[
					styles.pickerItem,
					{ opacity, height: itemHeight, transform: [{ scale }, { rotateX }] }
				]}>
				<Text style={[styles.pickerItemText, { fontSize: fs }]}>{item}</Text>
			</Animated.View>
		)
	}

	return (
		<Animated.FlatList
			style={[styles.container, { height: itemHeight * 5 }]}
			data={['', '', ...items, '', '']}
			renderItem={({ item, index }) => <WheelPickerItem {...{ item, index }} />}
			showsVerticalScrollIndicator={false}
			snapToInterval={itemHeight}
			onMomentumScrollEnd={momentumScrollEnd}
			scrollEventThrottle={16}
			onScroll={Animated.event(
				[{ nativeEvent: { contentOffset: { y: scrollY } } }],
				{ useNativeDriver: true },
			)}
			getItemLayout={(_, index) => ({
				length: itemHeight,
				offset: itemHeight * index,
				index
			})}
		/>
	)
})

const styles = StyleSheet.create({
	container: {
		width: '100%',
		position: 'absolute'
	}, 

	pickerItem: {
		justifyContent: 'center', 
		alignItems: 'center'
	},

	pickerItemText: {
		fontFamily: 'Poppins-Medium',
		textAlign: 'center',
		textAlignVertical: 'center',
		color: Colors.darkPrimary.hex
	}
})