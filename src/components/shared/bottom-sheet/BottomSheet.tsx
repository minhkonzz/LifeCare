import { FC, ReactNode, useRef, useEffect } from 'react'
import { View, Text, TouchableOpacity, Animated, Pressable, StyleSheet } from 'react-native'
import { horizontalScale, verticalScale } from '@utils/responsive' 
import { Colors } from '@utils/constants/colors'
import CloseIcon from '@assets/icons/close.svg'

const darkPrimary: string = Colors.darkPrimary.hex

interface BottomSheetProps {
    title: string, 
    isVisible: boolean,
    onClose?: () => void, 
    children?: ReactNode
}

export default ({
    title,
    isVisible = false, 
    onClose,
    children
}): FC<BottomSheetProps> => {
    const slideAnimation = useRef<Animated.Value>(new Animated.Value(0)).current
    const opacity = useRef<Animated.Value>(new Animated.Value(0)).current

    useEffect(() => {
	if (isVisible) {
	    Animated.parallel([
		Animated.timing(slideAnimation, {
		    toValue: 1, 
		    duration: 300, 
		    useNativeDriver: true
		}), 
		Animated.timing(opacity, {
		    toValue: 1, 
		    duration: 300, 
		    useNativeDriver: true
		})],
		{
		    stopTogether: true
		}
	    ).start()
	}
	else {
	    Animated.parallel([
		Animated.timing(slideAnimation, {
		    toValue: 0, 
		    duration: 300, 
		    useNativeDriver: true
		}), 
		Animated.timing(opacity, {
		    toValue: 0, 
		    duration: 300, 
		    useNativeDriver: true
		})],
		{
		    stopTogether: true
		}
	    ).start()
	}
    }, [isVisible, slideAnimation])

    return isVisible &&
    <Animated.View style={[styles.overlay, { opacity }]}>
	<Animated.View
	   style={[
               styles.bottomSheet, 
	       {
	           transform: [{
		       translateY: slideAnimation.interpolate({
		           inputRange: [0, 1], 
			   outputRange: [300, 0]
		       })
		   }]
	       }
	   ]}>
	   <View style={styles.header}>
	       <View />
	       <Text style={styles.headerTitle}>{title}</Text>
	       <Pressable onPress={onClose}>
	           <CloseIcon width={horizontalScale(10)} height={verticalScale(10)} />
	       </Pressable>
	   </View>
	   { children }
	</Animated.View>
    </Animated.View>
}

const styles = StyleSheet.create({
    bottomSheet: {
	position: 'absolute', 
	bottom: 0, 
	left: 0, 
	right: 0, 
	backgroundColor: '#fff',  
	borderTopLeftRadius: horizontalScale(24), 
	borderTopRightRadius: horizontalScale(24), 
	alignItems: 'center', 
	paddingHorizontal: horizontalScale(24), 
	paddingBottom: verticalScale(27)
    }, 

    header: {
        width: '100%',
	flexDirection: 'row', 
	justifyContent: 'space-between', 
	alignItems: 'center',
	paddingVertical: verticalScale(16)
    },

    headerTitle: {
    	fontFamily: 'Poppins-SemiBold', 
	fontSize: horizontalScale(16), 
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
	alignItems: 'center', 
	justifyContent: 'flex-end'
    }
})
