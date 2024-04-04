import { Text, StyleSheet, Pressable, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { darkRgb } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import LinearGradient from 'react-native-linear-gradient'

type InsightItemProps = {
	item: any,
	index: number
}

export default ({ item, index }: InsightItemProps): JSX.Element => {
	const navigation = useNavigation<any>()

	return (
		<Pressable 
			style={{...styles.container, marginHorizontal: hS(12), marginLeft: index === 0 ? hS(24) : 0 }}
			onPress={() => navigation.navigate('insight-reading', item)}>
			<Image style={styles.background} source={item.banner} />
			<LinearGradient
				style={styles.titleWrapper}
				start={{ x: .5, y: 0 }}
				end={{ x: .5, y: .8 }}
				colors={[`rgba(0, 0, 0, .002)`, `rgba(${darkRgb.join(', ')}, .8)`]}>
				<Text style={styles.title}>{item.title}</Text>
			</LinearGradient>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	container: {
		width: hS(346),
		height: vS(212),
		elevation: 12,
		shadowColor: `rgba(${darkRgb.join(', ')}, .5)`
	},

	background: {
		width: '100%',
		height: '100%',
		borderRadius: hS(32)
	},

	titleWrapper: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: vS(76),
		paddingVertical: vS(11),
		paddingHorizontal: hS(14),
		borderBottomLeftRadius: hS(32),
		borderBottomRightRadius: hS(32)
	},

	title: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(14),
		color: '#fff',
		lineHeight: vS(20)
	}
})
