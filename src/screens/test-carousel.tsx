import { View, Text, StyleSheet } from 'react-native'
import { SCREEN_WIDTH } from '@utils/responsive'
import Carousel from '@components/shared/carousel'

const Item = ({ item, index }) => {
   return (
      <View style={styles.item}>
         <Text>{item}</Text>
      </View>
   )
}

const data = [1, 2, 3]

export default (): JSX.Element => {
   return (
      <View style={styles.container}>
         <Carousel {...{ data, items: Item, style: styles.carousel }} />
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1, 
      
   },
   
   carousel: {
      flex: 1,
      backgroundColor: 'pink'
   },

   item: {
      width: SCREEN_WIDTH,
      height: 350,
      backgroundColor: 'yellow',
      justifyContent: 'center', 
      alignItems: 'center',
      borderWidth: 1
   }
})