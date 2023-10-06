import {
   View, 
   Text,
   StyleSheet
} from 'react-native'

export default (): JSX.Element => {
   return (
      <View style={styles.container}>

      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      justifyContent: 'space-between',  
      alignItems: 'center'
   }
})