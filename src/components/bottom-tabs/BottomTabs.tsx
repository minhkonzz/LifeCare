import { StyleSheet, View, Dimensions } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import Animated, {
   SharedValue,
   runOnJS,
   useAnimatedProps,
   useSharedValue,
   withTiming,
} from 'react-native-reanimated'
import { Colors } from '@utils/constants/colors'
import { interpolatePath } from 'react-native-redash'
import usePath from '@hooks/usePath'
import { getPathXCenter } from '@utils/path'
import TabItem from './BottomTabItem'
import AnimatedCircle from './AnimatedCircle'
import HomeWhiteIcon from '@assets/icons/home-white.svg'
import TimerWhiteIcon from '@assets/icons/timer-white.svg'
// import CalendarWhiteIcon from '@assets/icons/calendar-white.svg'
import ExploreWhiteIcon from '@assets/icons/explore-white.svg'
import UserWhiteIcon from '@assets/icons/user-white.svg'

const SCREEN_WIDTH = Dimensions.get('window').width
const AnimatedPath = Animated.createAnimatedComponent(Path)
const tabIcons = {
   'daily': HomeWhiteIcon,
   'timer': TimerWhiteIcon,
   'insights': ExploreWhiteIcon,
   'profile': UserWhiteIcon
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
            <AnimatedPath fill={Colors.darkPrimary.hex} {...{ animatedProps }} />
         </Svg>
         <AnimatedCircle circleX={circleXCoordinate} />
         <View style={[styles.tabItemsContainer, { height: tHeight }]}>
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
