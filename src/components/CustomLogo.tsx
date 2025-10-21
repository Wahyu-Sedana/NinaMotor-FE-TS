import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface CustomLogoProps {
  title: string;
  subtitle: string;
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  iconColor: string;
  backgroundColor: string;
}

const CustomLogo: React.FC<CustomLogoProps> = ({
  title,
  subtitle,
  iconName,
  iconColor = "#DC2626",
  backgroundColor = "#FFFFFF",
}) => {
  return (
    <View style={styles.logoContainer}>
      <View
        style={[
          styles.logoCircle,
          { backgroundColor: backgroundColor, borderColor: `${iconColor}30` },
        ]}
      >
        <MaterialCommunityIcons name={iconName} size={60} color={iconColor} />
      </View>

      {title && (
        <Text style={[styles.logoText, { color: iconColor }]}>{title}</Text>
      )}

      {subtitle && <Text style={styles.welcomeText}>{subtitle}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 2,
  },
  logoText: {
    fontSize: 32,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  welcomeText: {
    fontSize: 16,
    color: "#6B7280",
    marginTop: 8,
    fontWeight: "500",
  },
});

export default CustomLogo;
