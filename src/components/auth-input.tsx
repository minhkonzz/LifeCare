import { ReactNode, useEffect, useRef } from 'react'
import {
   TextInput,
   StyleSheet,
   Animated
} from 'react-native'
import { useDispatch } from 'react-redux'
import { updateEmail, updatePassword, updatePasswordConfirm, updateName } from '../store/auth-slice'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { Colors } from '@utils/constants/colors'

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
   hide?: boolean
}

export default ({
   placeholder,
   type,
   children,
   style,
   height = 32,
   fontSize,
   hide = false
}: AuthInputProps): JSX.Element => {
   console.log('\nrender authinput')
   const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current
   const dispatch = useDispatch()
   const onChangeTextAction = onChangeTextActions[type]
   useEffect(() => {
      Animated.timing(animateValue, {
         toValue: 1, 
         duration: 720,
         useNativeDriver: true
      }).start()
   }, [])

   return (
      <Animated.View style={[
         styles.container, 
         { 
            ...style, 
            height,
            transform: [{ translateX: animateValue.interpolate({
               inputRange: [0, 1],
               outputRange: [-300, 0]
               
            }) }]
         }
      ]}>
         { children }
         <TextInput
            onChangeText={t => dispatch(onChangeTextAction(t))}
            {...{
               placeholder,
               style: styles.input,
               secureTextEntry: hide
            }} />
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
      fontFamily: 'Poppins-Regular',
      fontSize: hS(13),
      color: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .6)`
   }
})
