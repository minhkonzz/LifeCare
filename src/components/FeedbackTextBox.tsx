import { FC, useState, useRef } from 'react' 
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    Animated, 
    TouchableOpacity,
    Image
} from 'react-native'

import ImagePickerIcon from '@assets/icons/image-picker.svg'
import { horizontalScale, verticalScale } from '@utils/responsive'
import { Colors } from '@utils/constants/colors'
import ImagePicker, { ImagePickerResponse } from 'react-native-image-picker'

const LINE_THRESHOLD = 3 
const darkPrimary: string = Colors.darkPrimary.hex

export default (): FC => {
    const [ text, setText ] = useState<string>('')
    const textInputHeight = useRef<Animated.Value>(new Animated.Value(verticalScale(159))).current
    const [ attactedImage, setAttachedImage ] = useState<string | null>(null)

    const handleTextChange = (text: string) => {
	setText(text)
	const lineCount = text.split('\n').length
	if (lineCount >= LINE_THRESHOLD) {
	    const newHeight = lineCount * 20
	    Animated.timing(textInputHeight, {
		toValue: newHeight, 
		duration: 200, 
		useNativeDriver: false
	    }).start()
	}
    }

    const handleImageAttachment = () => {
	ImagePicker.launchImageLibrary({
	    mediaType: 'photo', 
	}, (response: ImagePickerResponse) => {
	    const { didCancel, uri } = response 
	    if (!didCancel && uri) setAttachedImage(uri)
	})
    }

    return (
	<Animated.View style={[styles.container, { height: textInputHeight }]}>
	    <TextInput
	        multiline 
		numberOfLines={3}
	        style={styles.input} 
		placeholder='Please tell us more detail so that we can locate and solve your problem faster' 
	    />
	    <TouchableOpacity style={styles.pickImageButton} activeOpacity={.7} onPress={() => {}}>
		<ImagePickerIcon width={horizontalScale(18)} height={verticalScale(18)} />
	    </TouchableOpacity>
	</Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: horizontalScale(366),
	borderRadius: horizontalScale(24), 
	backgroundColor: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .12)`, 
	paddingHorizontal: horizontalScale(12), 
	justifyContent: 'space-between'
    }, 

    input: {
	fontFamily: 'Poppins-Regular', 
	fontSize: horizontalScale(12), 
	color: darkPrimary, 
	borderWidth: 1, 
	alignItems: 'flex-start'
    },

    pickImageButton: {
	width: horizontalScale(64), 
	height: verticalScale(64), 
	backgroundColor: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .24)`,
	borderRadius: horizontalScale(22), 
	justifyContent: 'center', 
	alignItems: 'center'
    }
})
