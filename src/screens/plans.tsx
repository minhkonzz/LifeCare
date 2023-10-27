import { FC, useState, useContext } from 'react'
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	Animated,
	Pressable,
	Platform,
	StatusBar,
	ScrollView,
	Image
} from 'react-native'
import { PopupContext } from '../contexts/popup'
import PopupProvider from '../contexts/popup'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { Colors } from '@utils/constants/colors'
import { useDeviceBottomBarHeight } from '@hooks/useDeviceBottomBarHeight'
import StackHeader from '@components/shared/stack-header'
import DayPlanItem from '@components/day-plan-item'
import LinearGradient from 'react-native-linear-gradient'
import plansData from '../assets/data/plans.json'

const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary
const { hex: primaryHex, rgb: primaryRgb } = Colors.primary

type PlanCategorySectionProps = {
	title: string,
	description: string,
	plansData?: Array<any>
}

const PlanCategorySection: FC<PlanCategorySectionProps> = ({
	title,
	description,
	plansData = []
}) => {
	return (
		<View style={styles.planCategorySection}>
			<View style={styles.planCategorySectionHeader}>
				<LinearGradient
					style={styles.planCategorySectionDecor}
					colors={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]}
					start={{ x: .5, y: 0 }}
					end={{ x: .5, y: 1 }}
				/>
				<Text style={styles.planCategorySectionTitle}>{title}</Text>
			</View>
			<Text style={styles.planCategorySectionDesc}>{description}</Text>
			<FlatList
				style={{ marginTop: vS(16), height: vS(170) }}
				horizontal
				showsHorizontalScrollIndicator={false}
				keyExtractor={item => item.id}
				data={plansData}
				renderItem={({ item }) => <DayPlanItem {...{ item }} />} />
		</View>
	)
}

const Plans = () => {
	const bottomBarHeight: number = useDeviceBottomBarHeight()
	const [ tabIndexSelected, setTabIndexSelected ] = useState<number>(0)
	const { popup: Popup, setPopup } = useContext(PopupContext)

	return (
		<View style={[styles.container, { paddingBottom: bottomBarHeight }]}>
			<View style={styles.header}>
				<View style={{ width: '100%', paddingHorizontal: hS(24) }}>
					<StackHeader title='Plans' />
				</View>
				<FlatList
					horizontal
					showsHorizontalScrollIndicator={false}
					data={plansData}
					keyExtractor={(item) => item.id}
					renderItem={({ item, index }) =>
						<View style={[
							styles.planCategory,
							{
								borderBottomWidth: vS(4),
								borderBottomColor: primaryHex
							}
						]}>
							<Text style={[
								styles.planCategoryTitle,
								{ color: index === tabIndexSelected ? darkHex : `rgba(${darkRgb.join(', ')}, .8)` }]}>
								{item.name}
							</Text>
						</View>
					} />
			</View>
			<ScrollView style={styles.main}>
				<PlanCategorySection
					title='Beginner'
					description='Skip one meal each day'
					plansData={plansData[0].items.filter(e => e.group_name === 'Beginner')} />
				<PlanCategorySection
					title='Intermediate'
					description='Eat only one meal each day'
					plansData={plansData[0].items.filter(e => e.group_name === 'Intermediate')} />
				<PlanCategorySection
					title='Advance'
					description='Keep fasting more than 20 hours'
					plansData={plansData[0].items.filter(e => e.group_name === 'Advance')} />
			</ScrollView>
			{ Popup && <Popup setVisible={setPopup} /> }
		</View>
	)
}

export default (): JSX.Element => {
	return (
		<PopupProvider>
			<Plans />
		</PopupProvider>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0
	},

	header: {
		width: '100%'
	},

	planCategory: {
		width: hS(140),
		height: vS(40),
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: hS(24)
	},

	planCategoryTitle: {
		fontFamily: 'Poppins-Regular',
		fontSize: hS(12)
	},

	main: {
		width: '100%',
		flex: 1
	},

	planCategorySection: {
		marginVertical: vS(16)
	},

	planCategorySectionHeader: {
		flexDirection: 'row',
		alignItems: 'center'
	},

	planCategorySectionDecor: {
		width: hS(7),
		height: vS(34),
		borderRadius: 80,
		marginLeft: hS(24)
	},

	planCategorySectionTitle: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(28),
		color: darkHex,
		letterSpacing: .2,
		marginLeft: hS(10),
		marginTop: vS(4)
	},

	planCategorySectionDesc: {
		fontFamily: 'Poppins-Regular',
		fontSize: hS(12),
		color: `rgba(${darkRgb.join(', ')}, .8)`,
		letterSpacing: .2,
		marginTop: vS(7),
		marginLeft: hS(24)
	},

	plan: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: hS(257),
		height: vS(148),
		elevation: 4,
		shadowColor: `rgba(${darkRgb.join(', ')}, .5)`,
		backgroundColor: '#fff',
		borderRadius: hS(32),
		paddingTop: vS(16),
		paddingLeft: hS(18),
		paddingRight: hS(11),
		paddingBottom: vS(10),
		marginLeft: hS(24),
		marginTop: vS(4)
	}
})
