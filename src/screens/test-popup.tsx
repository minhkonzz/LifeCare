import { useState } from 'react'
import {
   View,
   StyleSheet 
} from 'react-native'

import Popup from '@components/shared/popup'
import Button from '@components/shared/button/Button'
import Logout from '@components/shared/popup-content/logout'

export default (): JSX.Element => {
   const [ visible, setVisible ] = useState(false)
   const open = () => {
      setVisible(true)
   }

   return (
      <View style={{ flex: 1 }}>
         <Button title='Open' size='medium' onPress={open} />
         { 
            visible && 
            <Popup {...{ title: 'Logout', type: 'centered', visible, onClose: () => setVisible(false) }}>
               <Logout />
            </Popup>
         }
      </View>
   )
}

