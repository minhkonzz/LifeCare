import { FC, useState, useEffect, useRef } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Easing,
    Dimensions
} from 'react-native'

import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import LinearGradient from 'react-native-linear-gradient'
import BackIcon from '@assets/icons/goback.svg'
import SettingIcon from '@assets/icons/setting.svg'
import WhitePlusIcon from '@assets/icons/white_plus.svg'
import StrongBlueMinusIcon from '@assets/icons/strong_blue_minus.svg'
import WaterWave from '@assets/images/light_wave.svg'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')
const PADDING_SIDE: number = hS(22)
const darkPrimary: string = Colors.darkPrimary.hex
const lightBlue: string = Colors.lightBlue.hex
const strongBlue: string = Colors.strongBlue.hex

// const WaterBackground: FC = () => {
//     const translateX = useRef<Animated.Value>(new Animated.Value(0)).current
//     const translateY = useRef<Animated.Value>(new Animated.Value(0)).current

//     useEffect(() => {
//         Animated.timing(translateY, {
//             duration: 5000,
//             toValue: -SCREEN_HEIGHT + vS(400),
//             useNativeDriver: true,
//             easing: Easing.easeInOut
//         }).start()

//         const waterAnimation = Animated.loop(
//             Animated.timing(translateX, {
//                 duration: 2000,
//                 toValue: -SCREEN_WIDTH - hS(92),
//                 easing: Easing.linear,
//                 useNativeDriver: true
//             })
//         ).start()
//         return () => { waterAnimation.stop() }
//     }, [])

//     return (
//         <Animated.View
//             style={[styles.waterBackground, { transform: [{ translateX }, { translateY }] }]}>
//             <WaterWave />
//         </Animated.View>
//     )
// }

export default (): JSX.Element => {
    const [ total, setTotal ] = useState<number>(1200)
    return (
        <View style={styles.container}>
            {/* <WaterBackground /> */}
            <View style={styles.interacts}>
                <View style={styles.header}>
                    <BackIcon width={hS(14)} height={vS(14)} />
                    <Text style={styles.headerTitle}>Total today</Text>
                    <SettingIcon width={hS(18)} height={vS(18)} />
                </View>
                <View style={styles.results}>
                    <Text style={styles.totalMilText}>{`${total} ml`}</Text>
                    <Text style={styles.goalMilText}>{`Goal today: ${3000} ml`}</Text>
                </View>
                <View style={styles.updates}>
                    <TouchableOpacity style={styles.increaseMilButton} activeOpacity={.9} onPress={() => { }}>
                        <LinearGradient
                            style={styles.increaseMilButton}
                            colors={[lightBlue, `rgba(${Colors.strongBlue.rgb.join(', ')}, .6)`]}
                            start={{ x: .2, y: 0 }}
                            end={{ x: .5, y: 1 }}>
                            <WhitePlusIcon width={hS(20)} height={vS(20)} />
                            <Text style={styles.increaseMilAmount}>200 ml</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <View style={styles.sideUpdates}>
                        <TouchableOpacity
                            style={[styles.sideUpdateButton, styles.decreaseMilAmountButton]}
                            activeOpacity={.8}
                            onPress={() => { }}>
                            <StrongBlueMinusIcon width={hS(22)} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.sideUpdateButton, styles.openSettingButton]}
                            activeOpacity={.8}
                            onPress={() => { }}>

                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    headerTitle: {
        fontSize: 15,
        fontFamily: 'Poppins-SemiBold',
        color: darkPrimary
    },

    interacts: {
        flex: 1,
        paddingTop: 36,
        paddingBottom: vS(90),
        paddingHorizontal: hS(22),
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    results: {
        alignItems: 'center',
        marginBottom: vS(50)
    },

    totalMilText: {
        fontSize: hS(36),
        fontFamily: 'Poppins-SemiBold',
        color: strongBlue
    },

    goalMilText: {
        fontFamily: 'Poppins-Medium',
        fontSize: hS(14),
        color: darkPrimary
    },

    updates: {
        width: '75%',
        alignItems: 'center'
    },

    increaseMilButton: {
        width: hS(110),
        height: vS(110),
        borderRadius: 500,
        justifyContent: 'center',
        alignItems: 'center'
    },

    sideUpdates: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    sideUpdateButton: {
        width: hS(70),
        height: vS(70),
        backgroundColor: `rgba(${Colors.strongBlue.rgb.join(', ')}, .2)`,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 500
    },

    increaseMilAmount: {
        fontFamily: 'Poppins-Medium',
        color: '#fff',
        marginTop: 10
    },

    waterBackground: {
        flexDirection: 'row',
        position: 'absolute',
        top: SCREEN_HEIGHT,
        left: 0,
        bottom: 0,
        right: 0
    }
})
