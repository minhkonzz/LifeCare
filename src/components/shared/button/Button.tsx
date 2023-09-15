import { FC } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from '@utils/constants/colors' 
import { horizontalScale, verticalScale } from '@utils/responsive' 

interface ButtonProps {
    title: string, 
    onPress?: () => void, 
    size?: 'small' | 'medium' | 'large', 
    bgColor?: string | string[]
}

export default ({
    title, 
    onPress, 
    size = 'medium', 
    bgColor = Colors.primary.hex
}): FC<ButtonProps> => {
    const buttonStyles = [styles.button]
    const titleStyles = [styles.title] 

    if (size === 'small') {
        buttonStyles.push(styles.smallButton)
	titleStyles.push(styles.smallTitle)
    }

    if (size === 'large') {
	buttonStyles.push(styles.largeButton)
	titleStyles.push(styles.largeTitle)
    }

    if (Array.isArray(bgColor)) {
	return (
	    <TouchableOpacity {...{activeOpacity: .8, onPress}}>
		<LinearGradient 
		    colors={bgColor}
		    start={{ x: .5, y: 0 }}
		    end={{ x: .5, y: 1 }}
		    style={buttonStyles}>
		    <Text style={titleStyles}>{title}</Text>
		</LinearGradient>
	    </TouchableOpacity>
	)
    }	

    buttonStyles.push({ backgroundColor: bgColor })
    return (
	<TouchableOpacity {...{style: buttonStyles, activeOpacity: .3, onPress}}>
	    <Text style={titleStyles}>{title}</Text>
	</TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
	width: horizontalScale(240), 
	height: verticalScale(54), 
	justifyContent: 'center', 
	alignItems: 'center',
	borderRadius: horizontalScale(32)
    }, 

    title: {
        color: '#fff',
	fontFamily: 'Poppins-Medium', 
	fontSize: horizontalScale(12)
    },

    smallTitle: {
	fontSize: horizontalScale(8)
    }, 

    largeTitle: {
	fontSize: horizontalScale(16)
    }, 

    smallButton: {
	width: horizontalScale(120), 
	height: verticalScale(27)
    }, 

    largeButton: {
	width: horizontalScale(365),
	height: verticalScale(82)
    }
})


