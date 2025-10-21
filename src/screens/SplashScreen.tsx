import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Dimensions } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppNavigation } from "../helpers/UseAppNavigation";

const SplashScreen = () => {
  const navigation = useAppNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();

    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.circle1, { transform: [{ scale: pulseAnim }] }]}
      />
      <Animated.View
        style={[styles.circle2, { transform: [{ scale: pulseAnim }] }]}
      />

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.logoContainer}>
          <Animated.View style={{ transform: [{ rotate: spin }] }}>
            <MaterialCommunityIcons
              name="motorbike"
              size={100}
              color="#DC2626"
            />
          </Animated.View>
        </View>

        <Text style={styles.title}>NinaMotor</Text>
        <Text style={styles.subtitle}>Power Your Journey</Text>

        <View style={styles.loaderContainer}>
          <View style={styles.loaderTrack}></View>
        </View>
      </Animated.View>

      <Animated.Text style={[styles.footer, { opacity: fadeAnim }]}>
        © 2025 NinaMotor
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
  },
  circle1: {
    position: "absolute",
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "rgba(220, 38, 38, 0.08)",
  },
  circle2: {
    position: "absolute",
    bottom: -150,
    left: -100,
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: "rgba(220, 38, 38, 0.05)",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    marginBottom: 30,
    backgroundColor: "#FFFFFF",
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#DC2626",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 3,
    borderColor: "#FEE2E2",
  },
  title: {
    fontSize: 48,
    fontWeight: "800",
    color: "#DC2626",
    letterSpacing: -1,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "500",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  loaderContainer: {
    marginTop: 50,
    width: 0.6,
  },
  loaderTrack: {
    height: 4,
    backgroundColor: "#E5E7EB",
    borderRadius: 2,
    overflow: "hidden",
  },
  loaderFill: {
    height: "100%",
    backgroundColor: "#DC2626",
    borderRadius: 2,
  },
  footer: {
    position: "absolute",
    bottom: 50,
    fontSize: 12,
    color: "#9CA3AF",
    fontWeight: "500",
  },
});

export default SplashScreen;
