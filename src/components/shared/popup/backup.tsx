import { Dispatch, SetStateAction, useRef, memo } from 'react'
import {
   View, 
   Text,
   Image,
   Animated,
   StyleSheet
} from 'react-native'
import Popup from '@components/shared/popup'

export default memo(({ setVisible }: { setVisible: Dispatch<SetStateAction<boolean>> }): JSX.Element => {
   const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current

   return (
      <Popup {...{
         type: 'bottomsheet',
         title: 'Backup',
         animateValue,
         setVisible
      }}>
         
      </Popup>
   )
})

const styles = StyleSheet.create({
   container: {

   }
})