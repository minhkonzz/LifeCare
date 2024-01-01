import { FC } from 'react'
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	Platform,
	StatusBar,
	ScrollView
} from 'react-native'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { primaryHex, primaryRgb, darkHex, darkRgb } from '@utils/constants/colors'
import { useDeviceBottomBarHeight } from '@hooks/useDeviceBottomBarHeight'
import StackHeader from '@components/shared/stack-header'
import DayPlanItem from '@components/day-plan-item'
import LinearGradient from 'react-native-linear-gradient'
import plansData from '../assets/data/plans.json'

type PlanCategorySectionProps = {
	title: string,
	description: string,
	items?: Array<any>
}

const PlanCategorySectionHeader = ({ title }: { title: string }): JSX.Element => {
	return (
		<View style={styles.planCategorySectionHeader}>
			<LinearGradient
				style={styles.planCategorySectionDecor}
				colors={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]}
				start={{ x: .5, y: 0 }}
				end={{ x: .5, y: 1 }}
			/>
			<Text style={styles.planCategorySectionTitle}>{title}</Text>
		</View>
	)
}

const PlanCategorySection: FC<PlanCategorySectionProps> = ({
	title,
	description,
	items = []
}) => {
	return (
		<View style={styles.planCategorySection}>
			<PlanCategorySectionHeader {...{ title }} />
			<Text style={styles.planCategorySectionDesc}>{description}</Text>
			<FlatList
				style={{ marginTop: vS(16), height: vS(250) }}
				horizontal
				showsHorizontalScrollIndicator={false}
				keyExtractor={item => item.id}
				data={items}
				renderItem={({ item }) => <DayPlanItem {...{ item }} />} />
		</View>
	)
}

export default (): JSX.Element => {
	const bottomBarHeight: number = useDeviceBottomBarHeight()

	return (
		<View style={{...styles.container, paddingBottom: bottomBarHeight }}>
			<StackHeader title='Plans' />
			<ScrollView showsVerticalScrollIndicator={false} style={styles.main}>
				<PlanCategorySection
					title='Beginner'
					description='Skip one meal each day'
					items={plansData[0].items.filter(e => e.group_name === 'Beginner').map(e => ({ ...e, categoryName: plansData[0].name }))} />
				<PlanCategorySection
					title='Intermediate'
					description='Eat only one meal each day'
					items={plansData[0].items.filter(e => e.group_name === 'Intermediate').map(e => ({ ...e, categoryName: plansData[0].name }))} />
				<PlanCategorySection
					title='Advance'
					description='Keep fasting more than 20 hours'
					items={plansData[0].items.filter(e => e.group_name === 'Advance').map(e => ({ ...e, categoryName: plansData[0].name }))} />

				{/* <View style={styles.wfull}>
					<PlanCategorySectionHeader title='Custom' />
					<View style={styles.customPlan}>
						<CustomIcon width={hS(18)} height={vS(18)} />
						<Text style={styles.customPlanText}>Create your own fasting plan</Text>
					</View>
				</View> */}
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0
	},

	header: { width: '100%' },

	planList: {
		width: hS(16),
		height: vS(250),
		borderWidth: 1
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
