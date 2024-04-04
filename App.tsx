import { useEffect } from 'react'
import { Platform, PermissionsAndroid } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { NavigationContainer } from '@react-navigation/native'
import Stack from './src/navigations/stack'
import store from './src/store'

const persistor = persistStore(store)

export default (): JSX.Element => {
  const requestNotificationPermission = async () => {
    if (Platform.OS !== 'android') return
    try {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => { requestNotificationPermission() }, [])

  return (
    <Provider {...{ store }}>
      <PersistGate {...{ persistor }}>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack />
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  )
}