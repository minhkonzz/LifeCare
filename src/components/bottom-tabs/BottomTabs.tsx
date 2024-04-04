import { StyleSheet, View, Dimensions } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import Animated, { SharedValue, runOnJS, useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated'
import { darkHex } from '@utils/constants/colors'
import { interpolatePath } from 'react-native-redash'
import { getPathXCenter } from '@utils/path'
import { WhiteHomeIcon, WhiteTimerIcon, WhiteCalendarIcon, WhiteExploreIcon, WhiteUserIcon } from '@assets/icons'
import usePath from '@hooks/usePath'
import TabItem from './BottomTabItem'
import AnimatedCircle from './AnimatedCircle'

const SCREEN_WIDTH = Dimensions.get('window').width
const AnimatedPath = Animated.createAnimatedComponent(Path)
const tabIcons = {
   'daily': WhiteHomeIcon,
   'timer': WhiteTimerIcon,
   'nutrition': WhiteCalendarIcon,
   'insights': WhiteExploreIcon,
   'profile': WhiteUserIcon
}

export default ({ state, descriptors, navigation }) => {
   const { containerPath, curvedPaths, tHeight } = usePath()
   const circleXCoordinate: SharedValue<number> = useSharedValue(0)
   const progress = useSharedValue(1)

   const handleMoveCircle = (currentPath) => {
      circleXCoordinate.value = getPathXCenter(currentPath)
   }

   const animatedProps = useAnimatedProps(() => {
      const currentPath = interpolatePath(
         progress.value,
         Array.from({ length: curvedPaths.length }, (_, index) => index + 1),
         curvedPaths,
      );
      runOnJS(handleMoveCircle)(currentPath);
      return {
         d: `${containerPath} ${currentPath}`,
      };
   });

   const handleTabPress = (index, tabName) => {
      navigation.navigate(tabName);
      progress.value = withTiming(index);
   };

   return (
      <View style={styles.tabBarContainer}>
         <Svg width={SCREEN_WIDTH} height={tHeight} style={styles.shadowMd}>
            <AnimatedPath fill={darkHex} {...{ animatedProps }} />
         </Svg>
         <AnimatedCircle circleX={circleXCoordinate} />
         <View style={{...styles.tabItemsContainer, height: tHeight }}>
            {
               state.routes.map((route, index) => {
                  const { options } = descriptors[route.key];
                  const label = options.tabBarLabel ? options.tabBarLabel : route.name;
                  return (
                     <TabItem
                        key={index.toString()}
                        label={label}
                        icon={tabIcons[route.name]}
                        activeIndex={state.index + 1}
                        index={index}
                        onTabPress={() => handleTabPress(index + 1, route.name)} />
                  )
               })
            }
         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1
   },
   tabBarContainer: {
      position: 'absolute',
      bottom: 0,
      zIndex: 2
   },
   tabItemsContainer: {
      position: 'absolute',
      flexDirection: 'row',
      width: '100%'
   },
   shadowMd: {
      elevation: 3,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 3,
      shadowOffset: { width: 0, height: 3 },
   },
});
