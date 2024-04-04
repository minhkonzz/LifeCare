import {
   View, 
   Text,
   TextInput,
   Image,
   FlatList, 
   TouchableOpacity,
   Pressable, 
   StyleSheet
} from 'react-native'

import { primaryHex, primaryRgb, darkHex, darkRgb } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import LinearGradient from 'react-native-linear-gradient'
import { SearchIcon, WhiteScanIcon, WhiteBackIcon, WhitePlusIcon } from '@assets/icons'
import NutritionAddTotal from '@components/nutrition-add-total'
import addFoodList from '@assets/data/add-food-list.json'

export default (): JSX.Element => {
   return (
      <View style={styles.container}>
         <LinearGradient 
            style={styles.decor}
            colors={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]} 
            start={{ x: .5, y: 0 }}
            end={{ x: .5, y: 1 }}
         />
         <View style={styles.header}>
            <Pressable>
               <WhiteBackIcon width={hS(9.2)} height={vS(16)} />
            </Pressable>
            <View style={styles.headerTitle}>
               <Text style={styles.title}>Lunch</Text>
               <Text style={styles.recommendTitle}>Recommend 638 - 850 kcal</Text>
            </View>
            <Pressable>
               <WhiteScanIcon width={hS(20)} height={vS(20)} />
            </Pressable>
         </View>
         <View style={styles.search}>
            <SearchIcon width={hS(18)} height={vS(18)} />
            <TextInput placeholder='Search food' style={styles.searchInput} />
         </View>
         <FlatList 
            style={styles.list} 
            showsVerticalScrollIndicator={false}
            data={addFoodList} 
            keyExtractor={item => item.id.toString()} 
            renderItem={({ item }) => 
               <View style={styles.food}>
                  <View style={styles.foodDetail}>
                     <View style={styles.foodImageWrapper}>
                        <Image style={styles.foodImage} source={require('../assets/images/nutrition-personal-food.png')} />
                     </View>
                     <View style={styles.foodTexts}>
                        <Text style={styles.foodTitle}>{item.title}</Text>
                        <Text style={styles.foodDesc}>{`${item.cals} cals, ${item.grams}g`}</Text>
                     </View>
                  </View>
                  <TouchableOpacity activeOpacity={.8}>
                     <LinearGradient 
                        style={styles.foodAddButton}
                        colors={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]}
                        start={{ x: .5, y: 0 }}
                        end={{ x: .5, y: 1 }}>
                        <WhitePlusIcon width={hS(18)} height={vS(18)} />
                     </LinearGradient>
                  </TouchableOpacity>
               </View>
            } 
         />
         <NutritionAddTotal title='Calories consumed' value={562} />
      </View>
   )
}

const styles = StyleSheet.create({
   decor: {
      position: 'absolute',
      top: vS(-105),
      width: '100%',
      height: vS(250),
      borderBottomLeftRadius: 1000,
      borderBottomRightRadius: 1000,
      transform: [{ scaleX: 2 }]
   }, 

   container: {
      flex: 1,
      paddingHorizontal: hS(22),
      alignItems: 'center',
      backgroundColor: '#fff'
   },

   header: {
      width: '100%',
      flexDirection: 'row',  
      justifyContent: 'space-between', 
      paddingTop: vS(22)
   },

   headerTitle: {
      marginTop: vS(-8)
   },

   title: {
      fontFamily: 'Poppins-SemiBold', 
      fontSize: hS(18), 
      color: '#fff', 
      letterSpacing: .2,
      alignSelf: 'center'
   },

   recommendTitle: {
      fontFamily: 'Poppins-Medium', 
      fontSize: hS(11), 
      color: '#fff', 
      letterSpacing: .2,
      marginTop: vS(2)
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
      paddingHorizontal: hS(18), 
      marginTop: vS(18)
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
      height: vS(550)
   },

   food: {
      padding: hS(14), 
      marginHorizontal: hS(22),
      flexDirection: 'row', 
      elevation: 10, 
      shadowColor: `rgba(${darkRgb.join(', ')}, .5)`,
      backgroundColor: '#fff',
      borderRadius: hS(16), 
      marginVertical: vS(11)
   }, 

   foodDetail: {
      flexDirection: 'row'
   },

   foodImageWrapper: {
      elevation: 5, 
      shadowColor: `rgba(0, 0, 0, .25)`
   },

   foodImage: {
      width: hS(105) ,
      height: vS(105),
      borderRadius: 2000
   }, 

   foodTexts: {
      marginLeft: hS(16)
   },

   foodTitle: {
      width: hS(208),
      lineHeight: vS(20),
      fontFamily: 'Poppins-SemiBold', 
      fontSize: hS(14),
      color: `rgba(${darkRgb.join(', ')}, .8)`, 
      letterSpacing: .2
   },

   foodDesc: {
      fontFamily: 'Poppins-Regular',
      fontSize: hS(12), 
      color: `rgba(${darkRgb.join(', ')}, .8)`, 
      letterSpacing: .2,
      marginTop: vS(10)
   },

   foodAddButton: {
      width: hS(52),
      height: vS(52), 
      position: 'absolute', 
      bottom: 0, 
      right: 0,
      borderRadius: hS(22),  
      justifyContent: 'center', 
      alignItems: 'center'
   }
})