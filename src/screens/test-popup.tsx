import { useState } from 'react'
import { View } from 'react-native'
import Popup from '@components/shared/popup'
import Button from '@components/shared/button/Button'
import RadioOptions from '@components/shared/popup-content/radio-options'

export default (): JSX.Element => {
   const [ visible, setVisible ] = useState<boolean>(false)
   const open = () => {
      setVisible(true)
   }

   return (
      <View style={{ flex: 1 }}>
         <Button title='Open' size='medium' onPress={open} />
         { 
            visible && 
            <Popup {...{ title: 'Height', type: 'centered', visible, onClose: () => setVisible(false) }}>
               <RadioOptions options={['English', 'Vietnamese', 'Chinese']} />
            </Popup>
         }
      </View>
   )
}


