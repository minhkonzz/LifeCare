import { StyleSheet } from "react-native";
import { horizontalScale as hS, verticalScale as vS } from "@utils/responsive";
import { primaryHex } from "@utils/constants/colors";

export default StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingBottom: vS(27),
		paddingHorizontal: hS(24), 
		paddingTop: vS(22),
		backgroundColor: '#fff'
	},

	title: {
		fontSize: hS(36),
		fontFamily: 'Poppins-SemiBold',
		textAlign: 'center',
		color: primaryHex
	},
	
	texts: {
		justifyContent: 'center',
		width: '100%'
	},

	storyset: {
		width: hS(364),
		height: vS(364)
	}
});