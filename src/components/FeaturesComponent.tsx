import React from "react";
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { Zap, Shield, CreditCard } from "lucide-react-native";
import FlipCard from "./FlipCardComponent";

const FeaturesComponent: React.FC = () => {
  const featureCards = [
    {
      front: {
        icon: <CreditCard size={64} color="#3498db" />,
        title: "Payment Solutions",
        subtitle: "Secure & Swift",
        backgroundColor: "#e6f2ff",
      },
      back: {
        description: "Advanced Payment Features",
        details: [
          "Instant transaction processing",
          "Multi-currency support",
          "Fraud detection algorithms",
          "Seamless bank integration",
        ],
        backgroundColor: "#f0f8ff",
      },
    },
    {
      front: {
        icon: <Zap size={64} color="#2ecc71" />,
        title: "Performance Boost",
        subtitle: "Optimize Your Experience",
        backgroundColor: "#e8f5e9",
      },
      back: {
        description: "Performance Enhancements",
        details: [
          "Reduced load times",
          "Efficient data caching",
          "Smart resource allocation",
          "Adaptive UI rendering",
        ],
        backgroundColor: "#f1f8f1",
      },
    },
    {
      front: {
        icon: <Shield size={64} color="#e74c3c" />,
        title: "Security First",
        subtitle: "Protect What Matters",
        backgroundColor: "#fdedec",
      },
      back: {
        description: "Comprehensive Security",
        details: [
          "End-to-end encryption",
          "Biometric authentication",
          "Real-time threat monitoring",
          "Secure data storage",
        ],
        backgroundColor: "#fef0f0",
      },
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.screenTitle}>Product Features</Text>
        <Text style={styles.screenSubtitle}>Tap cards to explore details</Text>

        {featureCards.map((card, index) => (
          <FlipCard
            key={index}
            frontContent={card.front}
            backContent={card.back}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f9fc",
  },
  scrollContainer: {
    paddingVertical: 20,
    alignItems: "center",
  },
  screenTitle: {
    fontFamily: "Lexend-Bold",
    fontSize: 28,
    color: "#2c3e50",
    // marginBottom: 10,
    marginTop: 10,
    textAlign: "center",
  },
  screenSubtitle: {
    fontFamily: "Lexend-Regular",
    fontSize: 16,
    color: "#7f8c8d",
    marginBottom: 20,
    textAlign: "center",
  },
});

export default FeaturesComponent;
