import { useEffect } from 'react'
import { View, FlatList, Text, Animated, StyleSheet } from 'react-native'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { primaryHex, primaryRgb, darkHex, darkRgb, lightBlueHex } from '@utils/constants/colors'
import { AppStore } from '@store/index'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { BackIcon, DontEatTimeIcon, EatTimeIcon, PrimaryWeightIcon, StayHydratedIcon, WomenEatIcon } from '@assets/icons'
import { LineChart, CurveType } from 'react-native-gifted-charts'
import LinearGradient from 'react-native-linear-gradient'
import Button from '@components/shared/button/Button'
import LottieView from 'lottie-react-native'
import useAnimValue from '@hooks/useAnimValue'

export default (): JSX.Element => {
   const navigation = useNavigation<any>()
   const route = useRoute()
   const recommendation: any = route.params
   const animateValue = useAnimValue(0)
   const { currentWeight, goalWeight } = useSelector((state: AppStore) => state.survey)
   const lose: number = goalWeight - currentWeight

   const PersonalizedPlanRecommendation = () => {
      if (recommendation) {
         const { 
            fasting_plan_name,
            daily_water,
            daily_calories,
            other_tips,
            plan_explain,
            advise
         } = recommendation

         return (
            <>
               <Text style={styles.f12}>Personalized plan for you</Text>
               <View>
                  <Text style={styles.f14}>Based on your information you gave, we have some recommend for you</Text>
                  <View style={{ marginTop: vS(12) }}>
                     <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: hS(18), color: darkHex }}>Follow plan</Text>
                     <Text style={{...styles.f14, color: primaryHex, fontFamily: 'Poppins-SemiBold' }}>{fasting_plan_name}</Text>
                     <Text style={styles.f14}>{plan_explain}</Text>
                  </View>
                  <View style={{ marginTop: vS(12) }}>
                     <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: hS(18), color: darkHex }}>Daily water goal</Text>
                     <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: hS(22), color: lightBlueHex }}>{daily_water} <Text style={{ fontSize: hS(14) }}>ml</Text></Text>
                  </View>
                  <View style={{ marginTop: vS(12) }}>
                     <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: hS(18), color: darkHex }}>Daily calories</Text>
                     <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: hS(22), color: 'orange' }}>{daily_calories} <Text style={{ fontSize: hS(14) }}>cal</Text></Text>
                  </View>
                  <View style={{ marginTop: vS(12) }}>
                     <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: hS(18), color: darkHex }}>Other tips</Text>
                     <Text style={styles.f14}>{other_tips.map((e: any, i: number) => `${i + 1}. ${e}`).join('\n')}</Text>
                  </View>
                  <View style={{ marginTop: vS(12) }}>
                     <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: hS(18), color: darkHex }}>Other tips</Text>
                     <Text style={styles.f14}>{advise}</Text>
                  </View>
               </View>
            </>
         )
      }

      return <></>
   }

   useEffect(() => {
      Animated.timing(animateValue, {
         toValue: 1,
         duration: 840,
         useNativeDriver: true
      }).start()
   }, [])

   return (
      <View style={styles.container}>
         <FlatList
            data={[]}
            showsVerticalScrollIndicator={false}
            renderItem={null}
            ListHeaderComponent={
               <>
                  <Text style={styles.title}>
                     Your <Text style={styles.markedTitle}>exclusive</Text> plan has been generated
                  </Text>
                  <View style={{ ...styles.section, alignItems: 'center' }}>
                     <View style={{ alignItems: 'center' }}>
                        <View style={{...styles.k1, marginRight: hS(22) }}>
                           <PrimaryWeightIcon width={hS(28)} height={vS(28)} />
                           <Text style={styles.f1}>{`${lose} kg`}</Text>
                        </View>
                        <View style={{...styles.k1, marginTop: vS(16) }}>
                           <Text style={{...styles.f2, color: `rgba(${darkRgb.join(', ')}, .5)` }}>
                              {currentWeight} <Text style={styles.f3}>kg</Text>
                           </Text>
                           <BackIcon style={styles.k2} width={hS(18)} height={vS(18)} />
                           <Text style={{...styles.f2, color: darkHex }}>
                              {goalWeight} <Text style={styles.f3}>kg</Text>
                           </Text>
                        </View>
                     </View>
                     <LineChart 
                        color={primaryHex} 
                        thickness={5} 
                        dataPointsColor={primaryHex} 
                        data={[
                           { 
                              value: currentWeight, 
                              dataPointText: `${currentWeight} kg`
                           },
                           { 
                              value: goalWeight, 
                              dataPointLabelComponent: () => 
                                 <LinearGradient 
                                    style={styles.targetWeightDataPoint}
                                    colors={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]}
                                    start={{ x: .5, y: 0 }}
                                    end={{ x: .5, y: 1 }}>
                                    <Text style={styles.targetWeightDataPointText}>{`${goalWeight} kg`}</Text>
                                 </LinearGradient>
                           }
                        ]} 
                        disableScroll
                        spacing={hS(220)} 
                        xAxisColor={`rgba(${darkRgb.join(', ')}, .3)`}
                        yAxisOffset={20}
                        maxValue={102}
                        noOfSections={3}
                        yAxisTextNumberOfLines={500}
                        animationDuration={1500}
                        curved 
                        isAnimated
                        curveType={CurveType.QUADRATIC}
                        yAxisThickness={0}
                        xAxisThickness={0}
                        textFontSize={hS(16)}
                        dataPointsHeight={vS(36)}
                        hideYAxisText />

                     <View style={styles.k3}>
                        <View style={styles.k4}>
                           <Text style={styles.f4}>Dec 2023</Text>
                           <Text style={styles.f4}>June 2024</Text>
                        </View>
                     </View>
                     <View style={styles.k5} >
                        <LottieView
                           source={require('../assets/lottie/success-float.json')}
                           style={styles.i1}
                           autoPlay
                           loop={false} />
                        <Text style={styles.f5}>
                           Reach your target weight: <Text style={styles.f6}>{`${goalWeight} kg`}</Text>
                        </Text>
                     </View>
                  </View>
                  <View style={styles.section}>
                     <Text style={styles.f7}>
                        Visible changes in <Text style={styles.f8}>1 week</Text>
                     </Text>
                     <Text style={styles.f9}>-1.5 <Text style={styles.f10}>kg</Text></Text>
                  </View>
                  <View style={styles.k6}>
                     <Text style={styles.title}>Keep in your mind</Text>
                     <Text style={styles.f11}>
                        Intermittent fasting is an eating plan that switches
                        between fasting and eating on a regular schedule.
                        Research show fasting for a certain number of hours
                        each day may have some health benefits.
                        Intermittent fasting is an eating plan that switches
                        between fasting and eating on a regular schedule.
                        Research show fasting for a certain number of hours
                        each day may have some health benefits.
                     </Text>
                     <Text style={styles.f12}>Fasting is made up of two distinct phases</Text>
                     <View style={styles.k7}>
                        <DontEatTimeIcon width={hS(60)} height={vS(60)} />
                        <View style={styles.k8}>
                           <Text style={styles.f13}>Fasting window</Text>
                           <Text style={styles.f14}>Abstain from all food and drink beside non-caloric beverages.</Text>
                        </View>
                     </View>
                     <View style={styles.k7}>
                        <EatTimeIcon width={hS(60)} height={vS(60)} />
                        <View style={styles.k8}>
                           <Text style={styles.f13}>Eating window</Text>
                           <Text style={styles.f14}>Eat and drink during this period. Aim for balance.</Text>
                        </View>
                     </View>
                     <Text style={styles.f12}>Tips for success</Text>
                     <View style={styles.k7}>
                        <StayHydratedIcon width={hS(60)} height={vS(60)} />
                        <View style={styles.k8}>
                           <Text style={styles.f13}>Stay hydrated</Text>
                           <Text style={styles.f14}>Drink plenty of water, herbal tea or other non-caloric beverages during your fasting to stay hydrated and help suppress hunger.</Text>
                        </View>
                     </View>
                     <View style={styles.k7}>
                        <WomenEatIcon width={hS(60)} height={vS(60)} />
                        <View style={styles.k8}>
                           <Text style={styles.f13}>When it's time to eat</Text>
                           <Text style={styles.f14}>If you feel dizzy, weak, or lightheaded during your fasting period, it may be a sign to break your fast</Text>
                        </View>
                     </View>
                     <PersonalizedPlanRecommendation />
                  </View>
               </>
            } 
         />
         <View style={styles.bottom}>
            <Button
               onPress={() => navigation.navigate('main')}
               title='Start'
               bgColor={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]}
               size='large' />
         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      height: '100%',
      backgroundColor: '#fff',
      paddingTop: vS(22),
      paddingBottom: vS(150),
      paddingHorizontal: hS(24)
   },

   title: {
      width: hS(366),
      fontSize: hS(24),
      fontFamily: 'Poppins-SemiBold',
      color: darkHex,
      letterSpacing: .2,
      lineHeight: vS(42)
   },

   markedTitle: {
      color: primaryHex
   },

   section: {
      backgroundColor: '#fff',
      paddingVertical: vS(16),
      paddingHorizontal: hS(32),
      elevation: 10,
      shadowColor: `rgba(${darkRgb.join(', ')}, .8)`,
      borderRadius: hS(18),
      marginTop: vS(18)
   },

   bottom: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
      height: vS(140)
   },

   targetWeightDataPoint: {
      paddingHorizontal: hS(10),
      paddingVertical: vS(5), 
      justifyContent: 'center', 
      alignItems: 'center', 
      borderRadius: 8,
      marginTop: vS(-50),
      marginLeft: hS(-16)
   },

   targetWeightDataPointText: {
      fontSize: hS(16),
      fontFamily: 'Poppins-SemiBold',
      color: '#fff'
   },

   k1: {
      flexDirection: 'row',
      alignItems: 'center'
   },

   f1: {
      fontFamily: 'Poppins-Medium', 
      fontSize: hS(20), 
      color: darkHex, 
      letterSpacing: .2, 
      marginLeft: hS(4), 
      marginTop: vS(7)
   },

   f2: {
      fontSize: hS(30),
      fontFamily: 'Poppins-SemiBold'
   },

   f3: {
      fontSize: 13, 
      color: `rgba(${darkRgb.join(', ')}, .5)`
   },

   f4: {
      fontSize: hS(14), 
      fontFamily: 'Poppins-Medium', 
      color: `rgba(${darkRgb.join(', ')}, .7)`  
   },

   f5: {
      fontFamily: 'Poppins-Regular', 
      color: darkHex, 
      fontSize: hS(14), 
      marginLeft: hS(8), 
      marginTop: 2
   },

   f6: {
      color: primaryHex, 
      fontFamily: 'Poppins-SemiBold', 
      fontSize: hS(16)
   },

   f7: {
      fontFamily: 'Poppins-Medium',
      fontSize: hS(16),
      color: darkHex,
      letterSpacing: .2
   },

   f8: {
      fontFamily: 'Poppins-SemiBold'
   },

   f9: {
      fontFamily: 'Poppins-SemiBold', 
      fontSize: hS(40), 
      color: darkHex
   },

   f10: {
      fontSize: hS(16)
   },

   f11: {
      fontFamily: 'Poppins-Regular', 
      fontSize: hS(14), 
      color: `rgba(${darkRgb.join(', ')}, .7)`, 
      lineHeight: vS(25), 
      marginTop: vS(14)
   },

   f12: {
      fontFamily: 'Poppins-Medium', 
      fontSize: hS(20), 
      color: darkHex, 
      marginTop: vS(40),
      marginBottom: vS(16)
   },

   f13: {
      fontFamily: 'Poppins-SemiBold', 
      fontSize: hS(18), 
      color: darkHex, 
      marginBottom: vS(5)
   },

   f14: {
      fontFamily: 'Poppins-Regular', 
      fontSize: hS(13), 
      color: '#9f9f9f', 
      lineHeight: vS(24)
   },

   k2: {
      transform: [{ rotate: '180deg' }], 
      marginHorizontal: hS(12), 
      marginBottom: vS(8)
   },

   k3: {
      width: '100%', 
      marginTop: vS(30)
   },

   k4: {
      flexDirection: 'row', 
      justifyContent: 'space-between' 
   },

   k5: {
      flexDirection: 'row', 
      marginTop: vS(20)
   },

   k6: {
      marginTop: vS(30)
   },

   k7: {
      flexDirection: 'row'
   },

   k8: {
      marginLeft: hS(26), 
      marginTop: vS(14)
   },

   i1: {
      width: hS(32), 
      height: vS(32)
   }
})