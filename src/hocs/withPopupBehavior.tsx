import { memo, ComponentType, Dispatch, SetStateAction, useRef } from 'react'
import { Animated } from 'react-native'
import Popup from '@components/shared/popup'

export default <P extends object>(MainPopup: ComponentType<P>, isConfirm: boolean) => {
   return memo(({ setVisible }: { setVisible: Dispatch<SetStateAction<any>> }) => {
      const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current

      
      
      return (
         <Popup {...{
            type: 'centered',
            title: '',
            width: 0,
            animateValue,
            setVisible
         }}>
            <MainPopup {...({ setVisible, animateValue }) as P} />
         </Popup>
      )
   })
}