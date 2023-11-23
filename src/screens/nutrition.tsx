import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native' 
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import Screen from '@components/shared/screen'
import Calendar from '@components/shared/calendar'
import NutritionSwiper from '@components/nutrition-swiper'
import NutritionEditor from '@components/nutrition-editor'
import NutritionPersonalActivity from '@components/nutrition-personal-activity'
import NutritionPersonalMeal from '@components/nutrition-personal-meal'
import nutritionPersonalActivityData from '@assets/data/nutrition-personal-activity.json'
import LinearGradient from 'react-native-linear-gradient'
import MealWarnSvg from '@assets/images/meal-warn.svg'

const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary

const Meals = () => {
   return (
      <NutritionEditor title='Meal' totalCalories={562} caloriesMethod='consumed'>
         <NutritionPersonalMeal />
         <LinearGradient 
            style={styles.mealTips}
            colors={[`rgba(${darkRgb.join(', ')}, .6)`, darkHex]}
            start={{ x: .5, y: 0 }}
            end={{ x: .52, y: 1 }}>
            <View>
               <Text style={styles.mealTipsDesc}>Seem like pretty high on carb. Try to subtitute...</Text>
               <TouchableOpacity
                  style={styles.readMoreButton}
                  activeOpacity={.8}
                  onPress={() => {}}>
                  <Text style={styles.readMoreButtonText}>Read more</Text>
               </TouchableOpacity>
            </View>
            <MealWarnSvg style={styles.mealTipsSvg} width={hS(110)} height={vS(105)} />
         </LinearGradient>
      </NutritionEditor>
   )
}

const Activities = () => {
   return (
      <NutritionEditor title='Activities' totalCalories={64} caloriesMethod='burned'>
         <FlatList 
            data={nutritionPersonalActivityData} 
            showsVerticalScrollIndicator={false} 
            keyExtractor={item => item.id.toString()} 
            renderItem={({ item, index }) => 
               <NutritionPersonalActivity 
                  index={index}
                  title={item.title}
                  cals={item.calories} 
                  METDesc={item.METDescription} 
                  mins={item.mins} /> 
            }/>
      </NutritionEditor>
   )
}

export default (): JSX.Element => {
   return (
      <Screen paddingHorzContent header='tab' title='Nutrition' content={[
         Calendar, 
         NutritionSwiper, 
         Meals,
         Activities
      ]} />
   )
}

const styles = StyleSheet.create({
   main: {
      width: '100%', 
      alignItems: 'center', 
      paddingTop: vS(100)  
   }, 

   mealTips: {
      borderRadius: hS(24),
      paddingVertical: vS(14), 
      paddingHorizontal: hS(14),
      marginTop: vS(36),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end'
   },

   mealTipsSvg: {
      marginBottom: vS(-10)
   },

   mealTipsDesc: {
      width: hS(200),
      lineHeight: vS(20), 
      fontFamily: 'Poppins-Medium', 
      fontSize: hS(10), 
      color: '#fff',
      letterSpacing: .2
   },

   readMoreButton: {
      width: hS(111), 
      height: vS(37), 
      borderRadius: hS(16),
      backgroundColor: '#fff', 
      justifyContent: 'center', 
      alignItems: 'center', 
      marginTop: vS(13)
   },

   readMoreButtonText: {
      fontFamily: 'Poppins-Regular', 
      fontSize: hS(10), 
      color: darkHex, 
      letterSpacing: .2
   }
})