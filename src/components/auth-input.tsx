import { FC, useState } from 'react'
import {
    View, 
    Text,
    TextInput, 
    StyleSheet, 
    Animated
} from 'react-native'

import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { Colors } from '@utils/constants/colors'

type AuthInputProps = {
    placeHolder: string,
    children?: ReactNode,
    height?: number,
    fontSize?: number, 
    secret?: boolean, 
    style?: any,
    onTextChange?: () => void
}

export default ({
    placeHolder, 
    children, 
    onTextChange,
    style,
    height = 32,
    hide = false
}): FC<AuthInputProps> => {
    return (
	<View style={[styles.container, { ...style, height }]}>
            { children }
	    <TextInput placeholder={placeHolder} style={styles.input} />
	</View>
    )
}

const styles = StyleSheet.create({
    container: {
	width: '100%',
	justifyContent: 'center'
    }, 

    input: {
        paddingBottom: vS(10),
    	width: '100%', 
	height: '100%',
	position: 'absolute',
	borderBottomWidth: 1, 
	borderBottomColor: `#f0f0f0`,
	paddingLeft: hS(42),
	fontFamily: 'Poppins-Medium', 
	fontSize: hS(14), 
	color: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .6)`
    }
})
