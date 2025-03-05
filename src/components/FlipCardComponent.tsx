import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { MotiView } from "moti";

interface FlipCardProps {
  frontContent: {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    backgroundColor?: string;
  };
  backContent: {
    description: string;
    details: string[];
    backgroundColor?: string;
  };
}

const FlipCard: React.FC<FlipCardProps> = ({ frontContent, backContent }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => setIsFlipped(!isFlipped)}
      activeOpacity={0.8}
    >
      <MotiView
        from={{
          rotateY: isFlipped ? "0deg" : "-360deg",
          scale: 0.9,
        }}
        animate={{
          rotateY: isFlipped ? "360deg" : "0deg",
          scale: 1,
        }}
        transition={{
          type: "spring",
          //   damping: 15,
          //   stiffness: 1000,
          duration: 5000,
        }}
        style={styles.cardContainer}
      >
        <View
          style={[
            styles.card,
            {
              backgroundColor: isFlipped
                ? backContent.backgroundColor || "#f0f4f8"
                : frontContent.backgroundColor || "#ffffff",
            },
          ]}
        >
          {!isFlipped ? (
            <View style={styles.frontContent}>
              {frontContent.icon}
              <Text style={styles.frontTitle}>{frontContent.title}</Text>
              <Text style={styles.frontSubtitle}>{frontContent.subtitle}</Text>
            </View>
          ) : (
            <View style={styles.backContent}>
              <Text style={styles.backDescription}>
                {backContent.description}
              </Text>
              {backContent.details.map((detail, index) => (
                <Text key={index} style={styles.backDetail}>
                  • {detail}
                </Text>
              ))}
            </View>
          )}
        </View>
      </MotiView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: Dimensions.get("window").width - 40,
    height: 250,
    alignSelf: "center",
    // perspective: 1200,
    marginVertical: 12,
  },
  card: {
    flex: 1,
    borderRadius: 16,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 6 },
    // shadowOpacity: 0.15,
    // shadowRadius: 6,
    elevation: 6,
  },
  frontContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  frontTitle: {
    fontFamily: "Lexend-Bold",
    fontSize: 24,
    marginTop: 18,
    color: "#1c2833",
    textAlign: "center",
  },
  frontSubtitle: {
    fontFamily: "Lexend-Regular",
    fontSize: 18,
    color: "#566573",
    marginTop: 10,
    textAlign: "center",
  },
  backContent: {
    alignItems: "flex-start",
    width: "100%",
  },
  backDescription: {
    fontFamily: "Lexend-Bold",
    fontSize: 20,
    marginBottom: 14,
    color: "#1c2833",
    width: "100%",
    textAlign: "center",
  },
  backDetail: {
    fontFamily: "Lexend-Regular",
    fontSize: 16,
    color: "#2c3e50",
    marginBottom: 8,
    width: "100%",
    paddingHorizontal: 12,
  },
});

export default FlipCard;
