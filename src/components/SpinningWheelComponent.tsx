import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet, Easing } from "react-native";
import { Svg, Circle, G, Path, Text as SvgText, Polygon } from "react-native-svg";
import { Animated } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const sections = [
  { key: 1, label: "Try Again", color: "#FF6B6B", icon: "closecircleo", message: "Better luck next time! Keep spinning for a chance to win." },
  { key: 2, label: "$5 Coupon", color: "#4ECDC4", icon: "gift", message: "Congratulations! A $5 coupon is heading your way!" },
  { key: 3, label: "Try Again", color: "#FF6B6B", icon: "closecircleo", message: "Not a winner this time. Give it another spin!" },
  { key: 4, label: "$10 Coupon", color: "#FFD166", icon: "gift", message: "Congratulations! You've won a $10 coupon. Enjoy your reward!" },
  { key: 5, label: "Try Again", color: "#FF6B6B", icon: "closecircleo", message: "Almost! Try your luck again." },
  { key: 6, label: "Free Meal", color: "#1A535C", icon: "staro", message: "Congratulations! You've won a free meal. Time to feast!" }
];

const SpinningWheel = () => {
  const [rotation, setRotation] = useState(new Animated.Value(0));
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState(null);

  const spinWheel = () => {
    // Reset rotation to 0 before spinning
    rotation.setValue(0);
    
    const randomIndex = Math.floor(Math.random() * sections.length);
    // Increase number of spins to 10 for more dramatic effect
    const degrees = 360 * 10 + (randomIndex * (360 / sections.length));
    
    Animated.timing(rotation, {
      toValue: degrees,
      duration: 5000,
      useNativeDriver: true,
      easing: Easing.out(Easing.cubic), // Added easing for more natural spin
    }).start(() => {
      setSelectedPrize(sections[randomIndex]);
      setModalVisible(true);
    });
  };

  const getWheelPath = (index, total) => {
    const startAngle = (index * 360) / total;
    const endAngle = ((index + 1) * 360) / total;
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    
    const x1 = 50 + 50 * Math.cos(startRad);
    const y1 = 50 + 50 * Math.sin(startRad);
    const x2 = 50 + 50 * Math.cos(endRad);
    const y2 = 50 + 50 * Math.sin(endRad);
    
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    return `M50,50 L${x1},${y1} A50,50 0 ${largeArcFlag},1 ${x2},${y2} Z`;
  };

//   console.log("Selected Prize: ", selectedPrize.label + " - " + selectedPrize.message);

  return (
    <View style={styles.container}>
      {/* Pointer/Needle */}
      <View style={styles.pointerContainer}>
        {/* pointer pointing downward on the border */}
        <Svg width={18} height={24} viewBox="0 0 24 36">
            <Polygon
              points="12,10 24,36 0,36"
              fill="#333333"
              stroke="#FFFFFF"
              strokeWidth="1"
            />
        </Svg>
      </View>

      <Animated.View
        style={[
          styles.wheelContainer,
          { 
            transform: [{ 
              rotate: rotation.interpolate({ 
                inputRange: [0, 360],
                outputRange: ["0deg", "360deg"]
              }) 
            }] 
          }
        ]}
      >
        <Svg width={300} height={300} viewBox="0 0 100 100">
          <G>
            {sections.map((item, index) => (
              <G key={item.key}>
                <Path
                  d={getWheelPath(index, sections.length)}
                  fill={item.color}
                  stroke="#FFFFFF"
                  strokeWidth="1"
                />
                <SvgText
                  x={50 + 35 * Math.cos((index + 0.5) * 2 * Math.PI / sections.length)}
                  y={50 + 35 * Math.sin((index + 0.5) * 2 * Math.PI / sections.length)}
                  fontSize="4"
                  fontFamily="Lexend-Regular"
                  fill="#FFFFFF"
                  textAnchor="middle"
                  transform={`rotate(${(index + 0.5) * 360 / sections.length}, ${50 + 35 * Math.cos((index + 0.5) * 2 * Math.PI / sections.length)}, ${50 + 35 * Math.sin((index + 0.5) * 2 * Math.PI / sections.length)})`}
                >
                  {item.label}
                </SvgText>
              </G>
            ))}
          </G>
          <Circle cx={50} cy={50} r={5} fill="#333333" />
          <Circle cx={50} cy={50} r={3} fill="#FFFFFF" />
        </Svg>
      </Animated.View>

      <TouchableOpacity
        onPress={spinWheel}
        style={styles.spinButton}
      >
        <Text style={styles.spinButtonText}>SPIN</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <AntDesign 
              name={selectedPrize?.icon} 
              size={60} 
              color={selectedPrize?.color} 
            />
            <Text style={[styles.modalTitle, { color: selectedPrize?.color }]}>
              {selectedPrize?.label}
            </Text>
            <Text style={styles.modalMessage}>
              {selectedPrize?.message}
            </Text>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={[styles.modalButton, { backgroundColor: selectedPrize?.color }]}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  pointerContainer: {
    position: 'absolute',
    zIndex: 1,
    top: '38.2%', // Adjusted for better alignment
    alignItems: 'center',
  },
  wheelContainer: {
    position: 'relative',
  },
  spinButton: {
    marginTop: 20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  spinButtonText: {
    fontFamily: "Lexend-Bold",
    color: "white",
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalContent: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "white",
    padding: 25,
    alignItems: "center",
    elevation: 5,
  },
  modalTitle: {
    fontFamily: "Lexend-Bold",
    fontSize: 24,
    marginTop: 15,
  },
  modalMessage: {
    fontFamily: "Lexend-Regular",
    marginVertical: 15,
    textAlign: "center",
    fontSize: 16,
    color: "#333",
  },
  modalButton: {
    width: "80%",
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  modalButtonText: {
    fontFamily: "Lexend-Regular",
    textAlign: "center",
    color: "white",
    fontSize: 16,
  },
});

export default SpinningWheel;