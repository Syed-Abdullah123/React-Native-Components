import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ICONS = ["dots-grid", "dots-circle", "dots-hexagon", "dots-triangle"];
// const ICONS = ["dots-circle"];

const MorphingDotsLoader = () => {
  const [iconIndex, setIconIndex] = useState(0);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const rotate = () => {
    rotateAnim.setValue(0); // reset before starting
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start(() => {
      // Change to next icon
      setIconIndex((prev) => (prev + 1) % ICONS.length);
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      rotate();
    }, 1000); // space it out a bit

    return () => clearInterval(interval);
  }, []);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          transform: [{ rotate: rotateInterpolate }],
        }}
      >
        <MaterialCommunityIcons
          name={ICONS[iconIndex]}
          size={48}
          color="#000000"
        />
      </Animated.View>
      <Text
        style={{
          fontFamily: "Lexend-Regular",
          fontSize: 16,
          marginTop: 20,
        }}
      >
        Morphing Dots Loader ...
      </Text>
    </View>
  );
};

export default MorphingDotsLoader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
