import { FC, useState, useRef } from 'react'
import {
	StyleSheet,
	TextInput,
	ScrollView,
	Animated,
	TouchableOpacity,
	Image
} from 'react-native'

import ImagePickerIcon from '@assets/icons/image-picker.svg'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { Colors } from '@utils/constants/colors'
import { launchImageLibrary } from 'react-native-image-picker'

const LINE_THRESHOLD = 3
const FIXED_HEIGHT = vS(159)
const darkPrimary: string = Colors.darkPrimary.hex

export default (): JSX.Element => {
	const [ text, setText ] = useState<string>('')
	const textInputHeight = useRef<Animated.Value>(new Animated.Value(FIXED_HEIGHT)).current
	const [ attachedImages, setAttachedImages ] = useState<string[]>([])

	const handleTextChange = (text: string) => {
		setText(text)
		if (lineCount === 1) {
			Animated.timing(textInputHeight, {
				toValue: FIXED_HEIGHT,
				duration: 100,
				useNativeDrive: false
			})
			return
		}
		const lineCount = text.split('\n').length
		if (lineCount >= LINE_THRESHOLD) {
			const newHeight = FIXED_HEIGHT + lineCount * 8
			Animated.timing(textInputHeight, {
				toValue: newHeight,
				duration: 100,
				useNativeDriver: false
			}).start()
		}
	}

	const handleImageAttachment = async () => {
		let result: any = await launchImageLibrary({ mediaType: 'photo' })
		if (result.didCancel) return
		const uri: string = result.assets[0].uri ?? ""
		setAttachedImages(prevImages => [...prevImages, uri])
	}

	return (
		<Animated.View style={[styles.container, { height: textInputHeight }]}>
			<TextInput
				multiline
				style={styles.input}
				onChangeText={handleTextChange}
				placeholder='Please tell us more detail so that we can locate and solve your problem faster'
			/>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				style={styles.photosUpload}>
				{
					attachedImages.map((e, i) =>
						<Image
							style={[styles.imageUploadWrapper, { marginLeft: hS(12) }]}
							key={`image-${i + 1}`}
							source={{ uri: e }}
						/>
					)
				}
				<TouchableOpacity
					style={[styles.imageUploadWrapper, styles.pickImageButton]}
					activeOpacity={.7}
					onPress={handleImageAttachment}>
					<ImagePickerIcon width={hS(18)} height={vS(18)} />
				</TouchableOpacity>
			</ScrollView>
		</Animated.View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: hS(366),
		borderRadius: hS(24),
		backgroundColor: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .12)`,
		paddingVertical: vS(14),
		justifyContent: 'space-between'
	},

	input: {
		fontFamily: 'Poppins-Regular',
		fontSize: hS(12),
		color: darkPrimary,
		position: 'absolute',
		top: 0,
		paddingHorizontal: hS(22)
	},

	imageUploadWrapper: {
		width: hS(64),
		height: vS(64),
		borderRadius: hS(22)
	},

	pickImageButton: {
		backgroundColor: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .24)`,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: hS(12)
	},

	photosUpload: {
		position: 'absolute',
		bottom: vS(10)
	}
})
