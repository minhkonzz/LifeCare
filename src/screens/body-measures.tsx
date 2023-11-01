import { 
   View, 
   Text,
   StyleSheet
} from 'react-native'

export default (): JSX.Element => {
   return (
      <View style={styles.container}>
         <Text>Body measurements screen</Text>
      </View>
   )
}

const styles = StyleSheet.create({
   container: { flex: 1, justifyContent: 'center', alignItems: 'center' }
})