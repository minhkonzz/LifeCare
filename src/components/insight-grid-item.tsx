import { View, Text, StyleSheet, Pressable, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { darkHex, darkRgb } from '@utils/constants/colors'
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
			style={{...styles.container, marginLeft: index % 2 ? hS(8) : 0, marginTop: index > 1 ? vS(14) : 0 }}
			onPress={() => navigation.navigate('insight-reading', item)}>
			<Image style={styles.background} source={item.banner} />
			<LinearGradient 
            style={styles.titleWrapper}
            colors={[`rgba(${darkRgb.join(', ')}, .4)`, `rgba(${darkRgb.join(', ')}, .6)`]}
            start={{ x: .5, y: 0 }}
            end={{ x: .52, y: .5 }}>
            <Text style={styles.title}>{item.title}</Text>
         </LinearGradient>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	container: {
		width: hS(180),
		height: vS(265),
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
		height: vS(132),
		paddingVertical: vS(11),
		paddingHorizontal: hS(14),
		borderBottomLeftRadius: hS(32),
		borderBottomRightRadius: hS(32)
	},

	title: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(12),
		color: '#fff',
		lineHeight: vS(20)
	}
})
