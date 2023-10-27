import {
   View, 
   Text,
   StyleSheet
} from 'react-native'
import { NavigationProp, useRoute } from '@react-navigation/native'
import Button from '@components/shared/button/Button'

import { Colors } from '@utils/constants/colors'

const { hex: primaryHex, rgb: primaryRgb } = Colors.primary

export default ({ navigation }: { navigation: NavigationProp<any> }): JSX.Element => {
   const route = useRoute()
   const {
      goalWeight, 
      currentWeight,
      currentHeight, 
      age
   } = route.params

   return (
      <View style={styles.container}>
         <View style={styles.info}>
            <Text>{`Current height: ${currentHeight}`}</Text>
            <Text>{`Current weight: ${currentWeight}`}</Text>
            <Text>{`Goal weight: ${goalWeight}`}</Text>
            <Text>{`Your age: ${age}`}</Text>
         </View>
         <Button 
            title='Let me in' 
            size='large' 
            bgColor={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]} 
            onPress={() => navigation.navigate('main') } />
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1, 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      backgroundColor: '#fff', 
      paddingVertical: 27
   }, 

   info: {
      marginTop: 100
   }
})