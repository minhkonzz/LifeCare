import { FC, useState, useRef } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Platform,
    StatusBar,
    Image
} from 'react-native'

import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { useDeviceBottomBarHeight } from '@hooks/useDeviceBottomBarHeight'
import Login from '@components/Login'
import Register from '@components/Register'

export default (): JSX.Element => {
    const bottomBarHeight: number = useDeviceBottomBarHeight()
    const [isLogin, setIsLogin] = useState<boolean>(true)
    const storyset = isLogin && require('../assets/images/storyset/login.gif') || require('../assets/images/storyset/signup.gif')
    return (
        <View style={[styles.container, { paddingBottom: vS(18) + bottomBarHeight }]}>
            <Image
                style={styles.storyset}
                source={storyset}
            />
            {isLogin && <Login /> || <Register />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: hS(22),
        paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0
    },

    storyset: {
        width: hS(302),
        height: vS(302)
    }
})
