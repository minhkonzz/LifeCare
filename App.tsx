import { FC }  from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import FeedBack from '@screens/feedback/FeedBack'

export default (): FC => {
    return (
        <SafeAreaProvider>
	    <FeedBack />
	</SafeAreaProvider>
    )
}
