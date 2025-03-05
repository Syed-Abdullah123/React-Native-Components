import React, { useState, useCallback } from "react";
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

  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  return (
    <TouchableOpacity onPress={handleFlip} activeOpacity={0.9}>
      <View style={styles.cardContainer}>
        <MotiView
          animate={{
            transform: [{ rotateY: isFlipped ? "180deg" : "0deg" }],
          }}
          transition={{
            type: "spring",
            damping: 12,
            stiffness: 80,
            mass: 1,
          }}
          style={styles.cardWrapper}
        >
          {/* Front Side */}
          {!isFlipped && (
            <View
              style={[
                styles.card,
                { backgroundColor: frontContent.backgroundColor || "red" },
              ]}
            >
              {frontContent.icon}
              <Text style={styles.frontTitle}>{frontContent.title}</Text>
              <Text style={styles.frontSubtitle}>{frontContent.subtitle}</Text>
            </View>
          )}

          {/* Back Side */}
          {isFlipped && (
            <View
              style={[
                styles.card,
                {
                  backgroundColor: backContent.backgroundColor || "#e0e7ff",
                  transform: [{ rotateY: "180deg" }],
                },
              ]}
            >
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
        </MotiView>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: Dimensions.get("window").width - 40,
    height: 260,
    alignSelf: "center",
    perspective: 1200, // Helps with the 3D effect
    marginVertical: 12,
  },
  cardWrapper: {
    width: "100%",
    height: "100%",
    position: "relative",
    backfaceVisibility: "hidden",
  },
  card: {
    flex: 1,
    borderRadius: 18,
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  frontTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 15,
    color: "#1f2937",
    textAlign: "center",
  },
  frontSubtitle: {
    fontSize: 17,
    color: "#6b7280",
    marginTop: 6,
    textAlign: "center",
  },
  backDescription: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 14,
    color: "#374151",
    textAlign: "center",
  },
  backDetail: {
    fontSize: 16,
    color: "#475569",
    marginBottom: 6,
    textAlign: "center",
  },
});

export default FlipCard;
