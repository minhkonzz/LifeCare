import { FC }  from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import FastAIOverview from '@screens/fast-ai-bot/Overview'

export default (): FC => {
    return (
        <SafeAreaProvider>
	    <FastAIOverview />
	</SafeAreaProvider>
    )
}
