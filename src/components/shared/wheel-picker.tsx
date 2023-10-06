import { FC, useRef } from 'react'
import {
    Animated,
    ListRenderItemInfo,
    NativeScrollEvent,
    NativeSyntheticEvent,
    StyleSheet,
    Text,
    View,
} from 'react-native'

interface Props {
    items: string[] | number[], 
    itemHeight: number
    onIndexChange?: (index: number) => void
}

export default ({ items, itemHeight, onIndexChange }): FC<Props> => {
    const scrollY = useRef<Animated.Value>(new Animated.Value(0)).current

    const renderItem = ({item, index}: ListRenderItemInfo<string>) => {

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
	    outputRange: [.3, .6, 1, .6, .3], 
	    extrapolate: 'clamp'
    	})

    	const rotateX = scrollY.interpolate({
	    inputRange, 
	    outputRange: ['-48deg', '-36deg', '0deg', '36deg', '48deg'], 
	    extrapolate: 'clamp'
        })

        return (
            <Animated.View
                style={[
                { 
		    borderWidth: 1,
		    opacity, 
		    height: itemHeight, 
		    transform: [{ scale }, { rotateX }]
		},
                styles.animatedContainer,
            ]}>
                <Text style={styles.pickerItem}>{item}</Text>
            </Animated.View>
        )
    }    

    const momentumScrollEnd = (
        event: NativeSyntheticEvent<NativeScrollEvent>,
    ) => {
        const y = event.nativeEvent.contentOffset.y
        const index = Math.round(y / itemHeight)
        onIndexChange(index)
    }

    return (
        <View style={{ height: itemHeight * 5, borderWidth: 1 }}>
      	    <Animated.FlatList
	        style={{ borderWidth: 1, borderColor: 'yellow' }}
        	data={['', '', ...items, '', '']}
        	renderItem={renderItem}
        	showsVerticalScrollIndicator={true}
        	snapToInterval={itemHeight}
        	onMomentumScrollEnd={momentumScrollEnd}
        	scrollEventThrottle={16}
        	onScroll={Animated.event(
          	    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          	    { useNativeDriver: false },
        	)}
        	getItemLayout={(_, index) => ({
            	    length: itemHeight,
            	    offset: itemHeight * index,
            	    index
        	})} 
	    />
    	</View>
    )
}

const styles = StyleSheet.create({
    pickerItem: {
        fontSize: 18,
    	fontFamily: 'Poppins-Medium',
    	textAlign: 'center',
    	textAlignVertical: 'center',
    	color: '#000'
    },
  
    animatedContainer: {
        justifyContent: 'center',
    	alignItems: 'center'
    }
})
