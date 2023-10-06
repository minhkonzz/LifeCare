import { ReactNode, useRef } from 'react'
import { View, StyleSheet, Animated } from 'react-native'
import { horizontalScale, verticalScale } from '@utils/responsive'
import { Colors } from '@utils/constants/colors'

const darkPrimary: string = Colors.darkPrimary.hex

interface ModalProps {
    title: string,
    children?: ReactNode
}

export default ({ title, children }: ModalProps): JSX.Element => {
    const opacity = useRef<Animated.Value>(new Animated.Value(0)).current
    const translationY = useRef<Animated.Value>(new Animated.Value(0)).current
    const translateModal: () => void = () => {}

    return (
        <Animated.View style={{ flex: 1 }}>
            <Animated.View style={styles.modal}>
                <View style={styles.header}>

                </View>
            </Animated.View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    modal: {
        paddingHorizontal: horizontalScale(22),
        paddingBottom: verticalScale(17)
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: verticalScale(11)
    },

    headerTitle: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: horizontalScale(16),
        color: darkPrimary
    }
})

