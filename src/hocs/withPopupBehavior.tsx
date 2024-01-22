import { memo, ComponentType } from 'react'
import { Animated } from 'react-native'
import Popup from '@components/shared/popup'
import useAnimValue from '@hooks/useAnimValue'

export default <P extends object>(MainPopup: ComponentType<P>, type: 'bottomsheet' | 'centered', title: string, width?: number) => {
   return memo((props: any) => {
      const { setVisible } = props
      const animateValue = useAnimValue(0)

      const onConfirm = (afterDisappear: () => Promise<void>) => {
         Animated.timing(animateValue, {
            toValue: 0,
            duration: 320,
            useNativeDriver: true
         }).start(() => {
            if (afterDisappear) afterDisappear()
            setVisible(null)
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
            <MainPopup {...{...({ onConfirm }) as P, ...props}} />
         </Popup>
      )
   })
}