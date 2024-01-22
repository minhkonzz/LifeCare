import { StyleSheet } from 'react-native'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { darkHex, darkRgb } from '@utils/constants/colors'

export const commonStyles = StyleSheet.create({
   wfull: {
      width: '100%'
   },

   hrz: {
      flexDirection: 'row',
      alignItems: 'center'
   },

   errorText: {
      fontFamily: 'Poppins-Regular', 
      fontSize: hS(13), 
      color: 'red', 
      letterSpacing: .2
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

   headerNoteCircle: {
		width: hS(10),
		height: vS(10),
		borderRadius: 50
	},

   headerMainText: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(15),
		color: darkHex,
		letterSpacing: .2
	},

   headerNotes: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},

   headerNoteText: {
      fontFamily: 'Poppins-Regular',
		fontSize: hS(12),
		color: `rgba(${darkRgb.join(', ')}, .7)`,
		letterSpacing: .2,
		marginLeft: hS(8),
      marginTop: vS(4)
   }
})