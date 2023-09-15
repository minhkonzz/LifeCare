import {
   FC, 
   useState,
   useEffect,
   useRef
} from 'react'

import { 
   View,
   Text,
   StyleSheet,
   Animated,
   TextInput, 
   Easing
} from 'react-native'

import Svg, { G, Circle } from 'react-native-svg'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

interface ProgressCircleProps {
    percentage: number,
    radius: number, 
    strokeWidth: number,
    color: string,
    max?: number,
    duration?: number, 
    delay?: number, 
}

export default ({
    percentage,  
    radius,
    strokeWidth, 
    color, 
    max = 100,
    duration = 500, 
    delay = 0
}): FC<ProgressCircleProps> => {
    const animated = useRef(new Animated.Value(0)).current
    const [ strokeDashOffset, setStrokeDashOffset ] = useState<number>(0)
    const circleRef = useRef()
    const inputRef = useRef()
    const circumference = 2 * Math.PI * radius
    const halfCircle = radius + strokeWidth

    const animation = (toValue) => {
	return Animated.timing(animated, {
	    delay: 0,
      	    toValue,
            duration,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease)
	}).start()
    }

    useEffect(() => {
	animation(percentage)
	animated.addListener((v) => {
	    if (inputRef?.current) {
		inputRef.current.setNativeProps({
		    text: `${Math.round(v.value)}`
		})
	    }

	    if (circleRef?.current) {
		const maxPercentage = 100 * v.value / max
		const newStrokeDashOffset = circumference - (circumference * maxPercentage) / 100
		setStrokeDashOffset(newStrokeDashOffset)
	    }
	})

	return () => {
	    animated.removeAllListeners()
	}
    }, [])

    return (
	<View style={{ width: radius * 2, height: radius * 2 }}>
            <Svg
                height={radius * 2}
        	width={radius * 2}
        	viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
        	<G
          	    rotation='-90'
          	    originX={halfCircle}
		    originY={halfCircle}>
	  	    <Circle
            		cx='50%'
            		cy='50%'
            		r={radius}
            		fill='transparent'
            		stroke={color}
            		strokeWidth={strokeWidth}
            		strokeLinejoin='round'
            		strokeOpacity='.1' />

		    <AnimatedCircle
            	        ref={circleRef}
            		cx='50%'
            		cy='50%'
            		r={radius}
            		fill='transparent'
            		stroke={color}
            		strokeWidth={strokeWidth}
            		strokeLinecap='round'
            		strokeDashoffset={strokeDashOffset}
            		strokeDasharray={circumference} />

        	</G>
      	    </Svg>
      	    <AnimatedTextInput
                ref={inputRef}
                underlineColorAndroid='transparent'
                editable={false}
                defaultValue='0'
                style={[
        	    StyleSheet.absoluteFillObject,
          	    { fontSize: radius / 2, color },
                    styles.text
                ]} />
        </View>
    )	
}

const styles = StyleSheet.create({
  text: { fontWeight: '900', textAlign: 'center' },
})

