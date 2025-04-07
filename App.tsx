import React from "react";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import GamepadCircleLoader from "./src/components/Loaders/GamepadCircleLoader";
import BatteryLoader from "./src/components/Loaders/BatteryLoader";
import MorphingDotsLoader from "./src/components/Loaders/MorphingDotsLoader";

export default function App() {
  const [loaded] = useFonts({
    "Lexend-Regular": require("./assets/fonts/Lexend-Regular.ttf"),
    "Lexend-Bold": require("./assets/fonts/Lexend-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* <BatteryLoader /> */}
      {/* <GamepadCircleLoader /> */}
      <MorphingDotsLoader />
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
