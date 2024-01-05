import { useContext } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { PopupContext } from '@contexts/popup'
import SuggestionPopup from '@components/shared/popup/suggestion'

export default (): JSX.Element => {
   const { setPopup } = useContext<any>(PopupContext)

   const onPress = () => {
      setPopup(SuggestionPopup)
   }

   return (
      <View style={styles.container}>
         <TouchableOpacity activeOpacity={.8} {...{ onPress }}>
            <Text>Open popup</Text>
         </TouchableOpacity>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff'
   }
})