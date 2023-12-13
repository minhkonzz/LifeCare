import { memo, ComponentType, Dispatch, SetStateAction, useRef } from 'react'
import { Animated } from 'react-native'
import Popup from '@components/shared/popup'

export default <P extends object>(MainPopup: ComponentType<P>, type: 'bottomsheet' | 'centered', title: string, width?: number) => {
   return memo(({ setVisible }: { setVisible: Dispatch<SetStateAction<any>> }) => {
      const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current

      const onConfirm = (afterDisappear: () => Promise<void>) => {
         Animated.timing(animateValue, {
            toValue: 1,
            duration: 320,
            useNativeDriver: true
         }).start(() => {
            if (afterDisappear) afterDisappear()
         })
      }
      
      return (
         <Popup {...{
            type,
            title,
            width,
            animateValue,
            setVisible
         }}>
            <MainPopup {...({ setVisible, onConfirm }) as P} />
         </Popup>
      )
   })
}