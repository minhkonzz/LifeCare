import { memo, Dispatch, SetStateAction, useEffect } from 'react'
import { View, Text, Pressable, StyleSheet, Animated } from 'react-native'
import { UserFieldIcon, LockIcon, AtIcon, BackIcon } from '@assets/icons'
import { useSelector } from 'react-redux'
import { darkHex, darkRgb, primaryHex, primaryRgb } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive' 
import { AppStore } from '../store'
import { commonStyles } from '@utils/stylesheet'
import Button from '@components/shared/button/Button'
import AuthInput from './auth-input'
import AuthService from '@services/user'
import useAnimValue from '@hooks/useAnimValue'

const { hrz } = commonStyles

export default memo(({ setIsLogin }: { setIsLogin: Dispatch<SetStateAction<boolean>> }): JSX.Element => {
   const animateValue = useAnimValue(0)

   useEffect(() => {
      Animated.timing(animateValue, {
         toValue: 1, 
         duration: 640, 
         useNativeDriver: true
      }).start()
   }, [])

   const changeToSignIn = () => {
      Animated.timing(animateValue, {
         toValue: 0,
         duration: 640,
         useNativeDriver: true
      }).start(() => { setIsLogin(true) })
   }

   const SignupButton = (): JSX.Element => {
      const { email, password } = useSelector((state: AppStore) => state.auth)
      const onSignup = async() => {
         try {
            const data = await AuthService.signUpWithEmail(email, password)
            changeToSignIn()
         } catch (err) {
            console.error(err)
         }
      }
      return (
         <Button title='Sign up' size='large' onPress={onSignup} bgColor={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]} />
      )
   }

   return (
      <View style={styles.container}>
         <Animated.Image style={{...styles.storyset, transform: [{ scale: animateValue }] }} source={require('../assets/images/storyset/signup.gif')} />
         <Animated.View style={{
            ...styles.titleWrapper,
            ...hrz, 
            opacity: animateValue,
            transform: [{ translateX: animateValue.interpolate({
               inputRange: [0, 1],
               outputRange: [-200, 0]
            }) }]   
         }}>
            <Pressable onPress={changeToSignIn}><BackIcon width={hS(18)} height={vS(18)} /></Pressable>
            <Text style={styles.title}>Sign up</Text>
         </Animated.View>
         <Animated.View style={{
            width: '100%',
            transform: [{ translateX: animateValue.interpolate({
               inputRange: [0, 1], 
               outputRange: [-800, 0]
            }) }]
         }}>
            <AuthInput 
               placeholder='Email' 
               type='email'
               height={vS(48)}>
               <AtIcon width={hS(22)} height={vS(22)} />
            </AuthInput>
            <AuthInput placeholder='Password' type='password' height={vS(48)} hide>
               <LockIcon width={hS(22)} height={vS(22)} />
            </AuthInput>
            <AuthInput placeholder='Confirm password' type='password-confirm' height={vS(48)} hide>
               <LockIcon width={hS(22)} height={vS(22)} />
            </AuthInput>
            <AuthInput placeholder='Your name' type='name' height={vS(48)}>
               <UserFieldIcon width={hS(20)} height={vS(20)} />
            </AuthInput>
         </Animated.View>
         <Animated.View style={{...styles.termsRef, opacity: animateValue }}>
            <Animated.Text style={styles.termsRefTitle}>By signing up, you're agree with our</Animated.Text>
            <Animated.Text style={styles.termsRefHl}>Terms & conditions and Privacy policy</Animated.Text>
         </Animated.View>
         <Animated.View style={{ transform: [{ scale: animateValue }] }}>
            <SignupButton />
         </Animated.View>
      </View>
   )
})

const styles = StyleSheet.create({
   container: {
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center'
   },

   storyset: {
      width: hS(292), 
      height: vS(292)
   },

   titleWrapper: {
      alignSelf: 'flex-start'
   },

   title: {
      fontFamily: 'Poppins-SemiBold', 
      fontSize: hS(22), 
      color: darkHex, 
      letterSpacing: .2, 
      marginLeft: hS(22),
      marginTop: vS(4)
   },
   
   termsRef: {
      marginVertical: vS(14)
   },

   termsRefTitle: {
      fontFamily: 'Poppins-Medium',
      fontSize: hS(13),
      color: `rgba(${darkRgb.join(', ')}, .8)`
   }, 

   termsRefHl: {
      fontFamily: 'Poppins-SemiBold', 
      fontSize: hS(13), 
      color: primaryHex,
      lineHeight: vS(24), 
      marginTop: vS(2)
   }
})

