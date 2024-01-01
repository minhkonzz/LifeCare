import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { primaryHex } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'

interface ButtonProps {
    title: string,
    style?: any,
    onPress?: () => void,
    size?: 'small' | 'medium' | 'large',
    bgColor?: string | string[]
}

export default ({
    title,
    style,
    onPress,
    size = 'medium',
    bgColor = primaryHex
}: ButtonProps): JSX.Element => {
    const buttonStyles: any[] = [styles.button]
    const titleStyles: any[] = [styles.title]

    if (size === 'small') {
        buttonStyles.push(styles.smallButton)
        titleStyles.push(styles.smallTitle)
    }

    if (size === 'large') {
        buttonStyles.push(styles.largeButton)
        titleStyles.push(styles.largeTitle)
    }

    if (Array.isArray(bgColor)) {
        return (
            <TouchableOpacity {...{ activeOpacity: .8, onPress }}>
                <LinearGradient
                    colors={bgColor}
                    start={{ x: .5, y: 0 }}
                    end={{ x: .5, y: 1 }}
                    style={[buttonStyles, style]}>
                    <Text style={titleStyles}>{title}</Text>
                </LinearGradient>
            </TouchableOpacity>
        )
    }

    buttonStyles.push({ backgroundColor: bgColor })
    return (
        <TouchableOpacity {...{ style: [buttonStyles, style], activeOpacity: .3, onPress }}>
            <Text style={titleStyles}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        width: hS(240),
        height: vS(54),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: hS(32)
    },

    title: {
        color: '#fff',
        fontFamily: 'Poppins-Medium',
        fontSize: hS(12)
    },

    smallTitle: {
        fontSize: hS(8)
    },

    largeTitle: {
        fontSize: hS(14)
    },

    smallButton: {
        width: hS(120),
        height: vS(27)
    },

    largeButton: {
        width: hS(365),
        height: vS(82)
    }
})


