import { useEffect, useRef } from 'react'
import { View, Text, FlatList, Animated, StyleSheet } from 'react-native'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import BackIcon from '@assets/icons/goback.svg'
import InsightItem from './insight-item'

const darkPrimary: string = Colors.darkPrimary.hex

export default ({ item, index }: { item: any, index: number }): JSX.Element => {
	const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current
	const category = item.title

	useEffect(() => {
		Animated.timing(animateValue, {
			toValue: 1,
			duration: 920, 
			useNativeDriver: true
		}).start()
	}, [])

	return (
		<View style={{...styles.container, marginTop: index > 0 ? vS(28) : 0}}>
			<View style={styles.header}>
				<Animated.Text 
					style={{
						...styles.title,
						opacity: animateValue,
						transform: [{ translateY: animateValue.interpolate({
							inputRange: [0, 1], 
							outputRange: [10, 0]
						}) }]
					}}>
					{ category }
				</Animated.Text>
				<View style={styles.viewall}>
					<Text style={styles.viewallText}>See all</Text>
					<BackIcon style={styles.viewallIcon} width={hS(5)} height={vS(8)} />
				</View>
			</View>
			<FlatList 
				horizontal
				contentContainerStyle={{ paddingRight: hS(24) }}
				showsHorizontalScrollIndicator={false} 
				data={item.items} 
				keyExtractor={item => item.id} 
				renderItem={({ item: insight, index }) => <InsightItem {...{ item: {...insight, category }, index }}/>}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%'
	},

	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: vS(15),
		paddingHorizontal: hS(24)
	},

	title: {
		color: darkPrimary,
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(18),
		letterSpacing: .2
	},

	viewall: {
		flexDirection: 'row',
		alignItems: 'center'
	},

	viewallText: {
		marginRight: hS(10),
		fontFamily: 'Poppins-Regular',
		fontSize: hS(12),
		color: darkPrimary
	},

	viewallIcon: {
		transform: [{ rotate: '180deg' }],
		marginBottom: vS(3)
	}
})
