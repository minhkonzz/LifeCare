import { 
   memo, 
   Dispatch, 
   SetStateAction, 
   useEffect, 
   useRef 
} from 'react'
import {
   View,
   Text,
   Pressable,   
   StyleSheet, 
   Animated,
   Alert
} from 'react-native'
import Button from '@components/shared/button/Button'
import UserFieldIcon from '@assets/icons/user_field.svg'
import LockIcon from '@assets/icons/lock.svg'
import AtIcon from '@assets/icons/at.svg'
import AuthInput from './auth-input'
import BackIcon from '@assets/icons/goback.svg'
import { useSelector } from 'react-redux'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive' 
import { AppState } from '../store'
import AuthService from '@services/user'

const { hex: primaryHex, rgb: primaryRgb } = Colors.primary
const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary

export default memo(({ setIsLogin }: { setIsLogin: Dispatch<SetStateAction<boolean>> }): JSX.Element => {
   const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current

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
      }).start(({ finished }) => {
         setIsLogin(true)
      })
   }

   const SignupButton = (): JSX.Element => {
      const { email, password } = useSelector((state: AppState) => state.auth)
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
         <Animated.Image style={[styles.storyset, { transform: [{ scale: animateValue }] }]} source={require('../assets/images/storyset/signup.gif')} />
         <Animated.View style={[
            styles.titleWrapper,
            styles.horz, 
            {
               opacity: animateValue,
               transform: [{ translateX: animateValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-200, 0]
               }) }]   
            }
         ]}>
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
         <Animated.View style={[styles.termsRef, { opacity: animateValue }]}>
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

   horz: {
      flexDirection: 'row', 
      alignItems: 'center'
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

