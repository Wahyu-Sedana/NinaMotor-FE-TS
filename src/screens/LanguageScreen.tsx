import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppNavigation } from "../helpers/UseAppNavigation";
import { Text } from "@/components/GlobalUI";
import { RedButton } from "@/components/CustomButton";
import TranslationService from "@/services/LoadTranslationService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

const { width } = Dimensions.get("window");

interface LanguageOption {
  key: string;
  value: string;
  icon: string;
  iconColor: string;
}

const languages: LanguageOption[] = [
  { key: "en", value: "English", icon: "web", iconColor: "#3B82F6" },
  { key: "zh", value: "Chinese", icon: "translate", iconColor: "#EF4444" },
];

const LanguageScreen = () => {
  const navigation = useAppNavigation();
  const { t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleLanguageSelect = async (langKey: string) => {
    setSelectedLanguage(langKey);

    try {
      await TranslationService.loadTranslation(langKey);
    } catch (error) {
      console.error("Failed to load translation:", error);
    }
  };

  const handleNext = async () => {
    if (!selectedLanguage) return;

    setLoading(true);

    try {
      await AsyncStorage.setItem("selectedLanguage", selectedLanguage);

      setTimeout(() => {
        navigation.replace("Login");
      }, 300);
    } catch (error) {
      console.error("Failed to save language:", error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/iconapp.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>
          {selectedLanguage ? t("language.choose") : "Choose Your Language"}
        </Text>
        <Text style={styles.subtitle}>
          {selectedLanguage
            ? t("language.select_preferred")
            : "Select your preferred language"}
        </Text>
      </View>

      <View style={styles.languageContainer}>
        {languages.map((language) => (
          <TouchableOpacity
            key={language.key}
            style={[
              styles.languageCard,
              selectedLanguage === language.key && styles.languageCardSelected,
            ]}
            onPress={() => handleLanguageSelect(language.key)}
            activeOpacity={0.7}
          >
            <View style={styles.languageContent}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name={language.icon}
                  size={32}
                  color={language.iconColor}
                />
              </View>
              <View style={styles.languageTextContainer}>
                <Text
                  style={[
                    styles.languageName,
                    selectedLanguage === language.key &&
                      styles.languageNameSelected,
                  ]}
                >
                  {language.value}
                </Text>
              </View>
              {selectedLanguage === language.key ? (
                <MaterialCommunityIcons
                  name="check-circle"
                  size={24}
                  color="#3B82F6"
                />
              ) : (
                <MaterialCommunityIcons
                  name="circle-outline"
                  size={24}
                  color="#D1D5DB"
                />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <RedButton
          title={
            loading
              ? "Loading..."
              : selectedLanguage
              ? t("common.next")
              : "Next"
          }
          onPress={handleNext}
          disabled={!selectedLanguage || loading}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 NinaMotor</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 24,
  },
  header: {
    alignItems: "center",
    marginTop: 80,
    marginBottom: 60,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "400",
  },
  languageContainer: {
    gap: 16,
  },
  languageCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  languageCardSelected: {
    borderColor: "#3B82F6",
    backgroundColor: "#EFF6FF",
  },
  languageContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  languageTextContainer: {
    flex: 1,
  },
  languageName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#374151",
  },
  languageNameSelected: {
    color: "#3B82F6",
  },
  footer: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
  },
  footerText: {
    fontSize: 12,
    color: "#9CA3AF",
    fontWeight: "500",
  },
  buttonContainer: {
    marginTop: 32,
    paddingHorizontal: 0,
  },
});

export default LanguageScreen;
