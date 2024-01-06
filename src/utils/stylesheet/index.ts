import { StyleSheet } from 'react-native'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { darkHex } from '@utils/constants/colors'

export const commonStyles = StyleSheet.create({
   hrz: {
      flexDirection: 'row',
      alignItems: 'center'
   },

   popupButton: {
      width: '100%',
      height: vS(82),
      borderRadius: hS(32),
      overflow: 'hidden',
      marginTop: vS(20)
   },

   popupButtonBg: {
      width: '100%',
      height: '100%',
      justifyContent: 'center', 
      alignItems: 'center'
   },

   popupButtonText: {
      fontFamily: 'Poppins-SemiBold', 
      fontSize: hS(14), 
      color: '#fff', 
      letterSpacing: .2
   },

   blurOverlayWrapper: {		
		position: 'absolute',
		top: 0,
		left: 0, 
		right: 0,
		bottom: 0,
		justifyContent: 'center',
		alignItems: 'center'
	},

	blurOverlay: {
		position: 'absolute',
		width: '100%',
		height: '100%'
	},

	noDataText: {
		fontFamily: 'Poppins-Regular',
		fontSize: hS(14),
		color: darkHex,
		letterSpacing: .2
	},
})