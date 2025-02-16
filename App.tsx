import React from 'react'
import { View, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font'
// import GestureTopTabNavigator from './src/components/TopBarGestureBased'
// import GestureBottomTabNavigator from './src/components/BottomTabGestureBased'
import SpinningWheel from './src/components/SpinningWheelComponent'

export default function App() {
  const [loaded] = useFonts({
    'Lexend-Regular': require('./assets/fonts/Lexend-Regular.ttf'),
    'Lexend-Bold': require('./assets/fonts/Lexend-Bold.ttf'),
  })

  if (!loaded) {
    return null
  }

  return (
    <View style={styles.container}>
      <SpinningWheel />
      <StatusBar style="light"  />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})