import {
   View, 
   Text,
   TextInput,
   FlatList, 
   TouchableOpacity,
   Pressable, 
   StyleSheet
} from 'react-native'

import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { WhiteBackIcon, SearchIcon, WhitePlusIcon } from '@assets/icons' 
import LinearGradient from 'react-native-linear-gradient'
import NutritionAddTotal from '@components/nutrition-add-total'
import nutritionActivitiesData from '@assets/data/nutrition-personal-activity.json'

const { hex: primaryHex, rgb: primaryRgb } = Colors.primary
const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary

export default (): JSX.Element => {
   return (
      <View style={styles.root}>
         <LinearGradient 
            style={styles.decor}
            colors={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]} 
            start={{ x: .5, y: 0 }}
            end={{ x: .5, y: 1 }}
         />
         <View style={styles.container}>
            <View style={styles.header}>
               <Pressable>
                  <WhiteBackIcon width={hS(9.2)} height={vS(16)} />
               </Pressable>
               <Text style={styles.title}>Add new activity</Text>
            </View>
            <View style={styles.search}>
               <SearchIcon width={hS(18)} height={vS(18)} />
               <TextInput placeholder='Enter a activity name' style={styles.searchInput} />
            </View>
            <FlatList 
               style={styles.list} 
               showsVerticalScrollIndicator={false}
               data={nutritionActivitiesData} 
               keyExtractor={item => item.id.toString()} 
               renderItem={({ item, index }) => 
                  <View style={[styles.activity, { marginVertical: vS(11) }]}>
                     <View>
                        <Text style={styles.activityTitle}>{item.title}</Text>
                        <Text style={styles.activityDesc}>{`${item.calories} cals, ${item.METDescription ? item.METDescription : ''}, ${item.mins} mins`}</Text>
                     </View>
                     <TouchableOpacity activeOpacity={.8}>
                        <LinearGradient 
                           style={styles.activityAddButton}
                           colors={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]}
                           start={{ x: .5, y: 0 }}
                           end={{ x: .5, y: 1 }}>
                           <WhitePlusIcon width={hS(18)} height={vS(18)} />
                        </LinearGradient>
                     </TouchableOpacity>
                  </View>
               } 
            />
         </View>
         <NutritionAddTotal title='Calories burned' value={60} />
      </View>
   )
}

const styles = StyleSheet.create({
   root: {
      flex: 1, 
      backgroundColor: '#fff',
      alignItems: 'center'
   },

   decor: {
      position: 'absolute',
      top: vS(-120),
      width: '100%',
      height: vS(250),
      borderBottomLeftRadius: 1000,
      borderBottomRightRadius: 1000,
      transform: [{ scaleX: 2 }]
   }, 

   container: {
      width: '100%',
      paddingHorizontal: hS(22),
      alignItems: 'center'
   },

   header: {
      width: '100%',
      paddingVertical: vS(24),
   },

   title: {
      fontFamily: 'Poppins-SemiBold', 
      fontSize: hS(18), 
      color: '#fff', 
      letterSpacing: .2,
      alignSelf: 'center',
      marginTop: vS(-24)
   },

   search: {
      width: '100%', 
      height: vS(64), 
      borderRadius: hS(16),
      backgroundColor: '#fff', 
      elevation: 8, 
      shadowColor: darkHex, 
      flexDirection: 'row', 
      alignItems: 'center',
      paddingHorizontal: hS(18)
   },

   searchInput: {
      flex: 1,
      fontFamily: 'Poppins-Regular', 
      fontSize: hS(12), 
      letterSpacing: .2,
      color: `rgba(${darkRgb.join(', ')}, .8)`, 
      marginLeft: hS(13),
      marginTop: 2
   }, 

   list: {
      width: '110%',
      height: vS(550),
      marginTop: vS(32)
   },

   activity: {
      paddingVertical: vS(15), 
      paddingHorizontal: hS(22), 
      marginHorizontal: hS(22),
      flexDirection: 'row', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      elevation: 10, 
      shadowColor: `rgba(${darkRgb.join(', ')}, .5)`,
      backgroundColor: '#fff',
      borderRadius: hS(16)
   }, 

   activityTitle: {
      fontFamily: 'Poppins-SemiBold', 
      fontSize: hS(14),
      color: `rgba(${darkRgb.join(', ')}, .8)`, 
      letterSpacing: .2
   },

   activityDesc: {
      fontFamily: 'Poppins-Regular',
      fontSize: hS(12), 
      color: `rgba(${darkRgb.join(', ')}, .8)`, 
      letterSpacing: .2
   },

   activityAddButton: {
      width: hS(52),
      height: vS(52), 
      borderRadius: hS(22),  
      justifyContent: 'center', 
      alignItems: 'center'
   }
})