import feedbackNotSatisfiedOptions from '@assets/data/feedback-not-satisfied-options.json'
import FeedbackTextBox from '@components/feedback-textbox'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import Button from '@components/shared/button/Button'
import StackHeader from '@components/shared/stack-header'
import LinearGradient from 'react-native-linear-gradient'
import {
	View,
	Text,
	StyleSheet,
	Animated,
	Pressable
} from 'react-native'

const { hex: primaryHex, rgb: primaryRgb } = Colors.primary
const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary

export default (): JSX.Element => {
	const optionIndexesSelected = [1, 2, 4]
	return (
		<View style={styles.container}>
			<View style={styles.contentTop}>
				<StackHeader title='Feedback' />
				<View style={styles.main}>
					<Text style={styles.mainTitle}>What are you not satisfied with?</Text>
					<View style={styles.feedbackSelectOptions}>
					{
						feedbackNotSatisfiedOptions.map((e, i) => 
							<Pressable style={{ marginBottom: vS(15), marginLeft: hS(8) }} key={`${e.id}`}>
								<LinearGradient
									colors={optionIndexesSelected.includes(i) ? [`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex] : ['#fff', '#fff']}
									start={{ x: .5, y: 0 }}
									end={{ x: .5, y: 1 }}
									style={{
										...styles.feedbackSelectOption,
										...(!optionIndexesSelected.includes(i) ?
										{
											paddingHorizontal: hS(16),
											paddingVertical: vS(10),
											borderWidth: 2,
											borderColor: `rgba(${darkRgb.join(', ')}, .24)`
										} :
										{
											paddingHorizontal: hS(18),
											paddingVertical: vS(12)
										})
									}}>
									<Text
										style={{
											...styles.feedbackSelectOptionText,
											color: optionIndexesSelected.includes(i) ? '#fff' : darkHex,
											fontFamily: optionIndexesSelected.includes(i) ? 'Poppins-SemiBold' : 'Poppins-Medium'
										}}>
										{ e.title }
									</Text>
								</LinearGradient>
							</Pressable>
						)
					}
					</View>
					<FeedbackTextBox />
				</View>
			</View>
			<Button 
				title='Submit' 
				size='large' 
				bgColor={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]} 
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: hS(24)
	},

	contentTop: {
		width: '100%', 
		marginBottom: vS(32)
	},

	header: {
		paddingVertical: vS(22),
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},

	headerTitle: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(18),
		color: darkHex,
		letterSpacing: .2
	},

	main: {
		alignItems: 'center',
		marginTop: vS(32)
	},

	mainTitle: {
		fontFamily: 'Poppins-Medium',
		fontSize: hS(18),
		color: darkHex,
		letterSpacing: .2,
		marginBottom: vS(22)
	},

	feedbackSelectOptions: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginBottom: vS(38)
	},

	feedbackSelectOption: {
		borderRadius: 300,
	},

	feedbackSelectOptionText: {
		fontSize: hS(12)
	}
})
