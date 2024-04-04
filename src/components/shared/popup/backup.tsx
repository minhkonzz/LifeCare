import { Dispatch, SetStateAction, memo } from 'react'
import { StyleSheet } from 'react-native'
import Popup from '@components/shared/popup'
import useAnimValue from '@hooks/useAnimValue'

export default memo(({ setVisible }: { setVisible: Dispatch<SetStateAction<boolean>> }): JSX.Element => {
   const animateValue = useAnimValue(0)

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
   container: {}
})