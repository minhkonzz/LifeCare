import {
   View, 
   Text,
   StyleSheet 
} from 'react-native' 

import { horizontalScale as hS,verticalScale as vS } from '@utils/responsive'
import Screen from '@components/shared/screen'
import Calendar from '@components/shared/calendar'
import TabHeader from '@components/tab-header'
import NutritionSwiper from '@components/nutrition-swiper'
import NutritionEditor from '@components/nutrition-editor'

export default (): JSX.Element => {
   return (
      <>
         <Screen scroll paddingHorzContent>
            <View style={styles.main}>
               <Calendar />
               <NutritionSwiper /> 
               <NutritionEditor title='Meal' totalCalories={562} caloriesMethod='consumed' />
               <NutritionEditor title='Activities' totalCalories={64} caloriesMethod='burned' />
            </View>
         </Screen>
         <TabHeader title='Nutrition' />
      </>
   )
}

const styles = StyleSheet.create({
   main: {
      width: '100%', 
      alignItems: 'center', 
      paddingTop: vS(100)  
   }
})