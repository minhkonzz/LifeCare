import { FC, useState, useRef } from 'react'
import {
    View, 
    Text,
    StyleSheet, 
    TouchableOpacity, 
    Animated,
    Pressable
} from 'react-native'

import GoogleIcon from '@assets/icons/google_logo.svg'
import AtIcon from '@assets/icons/at.svg'
import LockIcon from '@assets/icons/lock.svg'
import AuthInput from '@components/auth-input'
import Button from '@components/shared/button/Button'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { Colors } from '@utils/constants/colors'

const darkPrimary: string = Colors.darkPrimary.hex

export default (): FC => {
    return (
	<View style={styles.container}>
	    <View style={{ marginTop: vS(-8) }}>
	        <View>
		    <Text style={styles.lgTitle}>Hello Friend,</Text>
		    <Text style={styles.smTitle}>Login to track your fasting now</Text>	
	        </View>
	        <View style={{ marginTop: vS(14) }}>
		    <AuthInput 
		        placeHolder='Email'
		        height={vS(48)}>
		        <AtIcon width={hS(23)} height={vS(22)} />
		    </AuthInput>
		    <AuthInput
		        style={{ marginTop: vS(14) }}
		        secret
		        placeHolder='Password'
		        height={vS(48)}>
		        <LockIcon width={hS(23)} height={vS(23)} />
		    </AuthInput>
		    <Button 
		        title='Sign in' 
		        size='large'
		        style={{ marginTop: vS(30) }}
		        bgColor={[`rgba(${Colors.primary.rgb.join(', ')}, .6)`, Colors.primary.hex]}
		    />
	        </View>
		<View style={{ marginTop: vS(16) }}>
		    <View style={{
			flexDirection: 'row', 
			alignItems: 'center',
			marginBottom: vS(16),
			justifyContent: 'center'
		    }}>
			<View style={{ 
			    width: hS(70), 
			    height: 1, 
			    backgroundColor: '#e4e4e4', 
			    marginRight: hS(10)
			}}/>
			<Text style={{
			    fontFamily: 'Poppins-Medium', 
			    fontSize: hS(14), 
			    color: '#8a8a8a'
			}}>
			    OR
			</Text>
		        <View style={{ 
			    width: hS(70), 
			    height: 1, 
			    backgroundColor: '#e4e4e4', 
			    marginLeft: hS(10)
			}}/>	
		    </View>
		    <TouchableOpacity
		        style={styles.googleLoginButton}
			activeOpacity={.7}
			onPress={() => {}}>
			<GoogleIcon 
			    style={{ position: 'absolute', left: hS(28) }}
			    width={hS(32)} 
			    height={vS(32)} 
			/>
			<Text style={styles.googleLoginButtonText}>Sign in with Google</Text>
		    </TouchableOpacity>
		</View>
	    </View>
	    <View style={styles.registerRef}>
		<Text style={styles.registerRefTitle}>Are you new come in?</Text>
		<Pressable style={{ marginLeft: hS(10) }} onPress={() => {}}>
		    <Text style={styles.registerRefPress}>Sign up</Text>
		</Pressable>
	    </View>
	</View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
	width: '100%', 
	justifyContent: 'space-between'
    },

    lgTitle: {
	fontFamily: 'Poppins-SemiBold', 
	fontSize: hS(24), 
	color: darkPrimary
    },

    smTitle: {
	fontFamily: 'Poppins-Medium',
	fontSize: hS(16), 
	color: darkPrimary 
    }, 

    googleLoginButton: {
	width: '100%', 
	height: vS(82), 
	borderRadius: hS(32), 
	justifyContent: 'center', 
	alignItems: 'center',
	backgroundColor: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .1)`
    },

    googleLoginButtonText: {
	fontFamily: 'Poppins-Medium', 
	fontSize: hS(14), 
	color: '#8a8a8a'
    },

    registerRef: {
	flexDirection: 'row',
	justifyContent: 'center',
	alignItems: 'center'
    }, 

    registerRefTitle: {
	fontFamily: 'Poppins-Medium', 
	fontSize: hS(14), 
	color: '#8a8a8a'
    },

    registerRefPress: {
	fontFamily: 'Poppins-SemiBold', 
	fontSize: hS(14), 
	color: Colors.primary.hex
    }
})


