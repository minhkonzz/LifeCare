import { StyleSheet, FlatList } from 'react-native'
import ProfileFastingRecords from '@components/profile-fasting-records'
import ProfileHydrateRecords from '@components/profile-hydrate-records'
import ProfileWeight from '@components/profile-weight'

export default (): JSX.Element => {
   return (
      <FlatList 
         style={styles.container}
         contentContainerStyle={{ alignItems: 'center' }}
         data={[]}
         renderItem={null}
         ListHeaderComponent={
            <>
               <ProfileFastingRecords />
               <ProfileHydrateRecords />
               <ProfileWeight />
            </>
         } 
      />
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      paddingTop: 10
   }
})