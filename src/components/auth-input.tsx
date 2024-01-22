import { ReactNode, useState, useEffect, useRef } from 'react'
import { TextInput, StyleSheet, Animated, Pressable } from 'react-native'
import { useDispatch } from 'react-redux'
import { updateEmail, updatePassword, updatePasswordConfirm, updateName } from '../store/auth'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { darkRgb } from '@utils/constants/colors'
import { EyeIcon, EyeHidedIcon } from '@assets/icons'
import useAnimValue from '@hooks/useAnimValue'

const onChangeTextActions = {
   'email': updateEmail,
   'password': updatePassword, 
   'password-confirm': updatePasswordConfirm,
   'name': updateName
}

interface AuthInputProps {
   placeholder: string,
   type: 'email' | 'password' | 'password-confirm' | 'name'
   children?: ReactNode,
   height?: number,
   fontSize?: number,
   style?: any,
   hide?: boolean,
   onFocus?: () => void
}

export default ({
   placeholder,
   type,
   children,
   style,
   height = 32,
   fontSize,
   hide = false,
   onFocus
}: AuthInputProps): JSX.Element => {
   const animateValue = useAnimValue(0)
   const dispatch = useDispatch()
   const [ hided, setHided ] = useState<boolean>(hide)
   const onChangeTextAction = onChangeTextActions[type]
   const Eye = hided && EyeHidedIcon || EyeIcon

   useEffect(() => {
      Animated.timing(animateValue, {
         toValue: 1, 
         duration: 720,
         useNativeDriver: true
      }).start()
   }, [])

   return (
      <Animated.View style={{
         ...styles.container, 
         ...style, 
         height,
         transform: [{ translateX: animateValue.interpolate({
            inputRange: [0, 1],
            outputRange: [-300, 0]
         }) }]
      }}>
         { children }
         <TextInput
            onChangeText={t => dispatch(onChangeTextAction(t))}
            {...{
               onFocus,
               placeholder,
               style: styles.input,
               secureTextEntry: hided
            }} />
         { hide && <Pressable style={styles.eyeIc} onPress={() => setHided(!hided)}><Eye width={hS(22)} height={vS(22)} /></Pressable> }
      </Animated.View>
   )
}

const styles = StyleSheet.create({
   container: {
      width: '100%',
      justifyContent: 'center',
      marginVertical: vS(11)
   },

   input: {
      paddingBottom: vS(10),
      width: '100%',
      height: '100%',
      position: 'absolute',
      borderBottomWidth: 1,
      borderBottomColor: `#f0f0f0`,
      paddingLeft: hS(42),
      paddingRight: hS(80),
      fontFamily: 'Poppins-Regular',
      fontSize: hS(13),
      color: `rgba(${darkRgb.join(', ')}, .6)`
   },

   eyeIc: {
      position: 'absolute',
      right: hS(20),
      top: hS(10)
   }
})
