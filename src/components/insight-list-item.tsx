import { Text, StyleSheet, Pressable, Image } from 'react-native'
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
			style={{...styles.container, marginTop: vS(index > 0 ? 12 : 0) }}
			onPress={() => navigation.navigate('insight-reading', item)}>
			<Image style={styles.background} source={item.banner} />
         <Text style={styles.title}>{item.title}</Text>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	container: {
		width: hS(370),
		height: vS(92),
		elevation: 12,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: hS(16),
		shadowColor: `rgba(${darkRgb.join(', ')}, .5)`,
	},

	background: {
      width: hS(160),
		height: '100%',
      borderRadius: hS(16)
	},

	title: {
      width: hS(180),
      marginLeft: hS(16),
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(14),
		color: darkHex,
		lineHeight: vS(20)
	}
})
