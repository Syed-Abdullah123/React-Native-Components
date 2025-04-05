import React, { useEffect, useRef, useState } from "react";
import { Animated, View, StyleSheet, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const batteryIcons = [
  "battery-0",
  "battery-1",
  "battery-2",
  "battery-3",
  "battery-4",
];

const BatteryLoader = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % batteryIcons.length);
    }, 400); // Change every 400ms

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <FontAwesome
          name={batteryIcons[currentIndex]}
          size={48}
          color="#000000"
        />
      </Animated.View>
      <Text style={{ fontFamily: "Lexend-Regular", marginTop: 20 }}>
        Battery Loader .....
      </Text>
    </View>
  );
};

export default BatteryLoader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
