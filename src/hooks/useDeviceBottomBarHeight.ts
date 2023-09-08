import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function useDeviceBottomBarHeight(): number {
    const insets = useSafeAreaInsets() 
    return insets.bottom
}
