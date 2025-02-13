import React from 'react'
import { View, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import GestureTopTabNavigator from './src/components/TopBarGestureBased'
// import GestureBottomTabNavigator from './src/components/BottomTabGestureBased'

export default function App() {
  return (
    <View style={styles.container}>
      <GestureTopTabNavigator />
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