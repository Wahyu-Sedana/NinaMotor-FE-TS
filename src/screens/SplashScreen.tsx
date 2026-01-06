import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Dimensions, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppNavigation } from "../helpers/UseAppNavigation";
import { Text } from "@/components/GlobalUI";
import { useStore } from "@/stores/RootStore";
import { eraseToken, getToken } from "@/common/UserStorage";
import { log } from "@/helpers/Logger";

const SplashScreen = () => {
  const navigation = useAppNavigation();

  const { userStore } = useStore();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const token = await getToken();
      console.log(token);

      if (token === undefined) {
        return navigation.replace("Login");
      } else {
        const res = await userStore.getProfile();
        log.info(res);
        if (res.success == false) {
          await eraseToken();
          return navigation.replace("Login");
        } else {
          return navigation.replace("Home");
        }
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={[styles.content]}>
        <Image
          source={require("../../assets/iconapp.png")}
          style={{ width: 250, height: 250 }}
        />
      </View>

      <Text style={styles.footer}>© 2025 NinaMotor</Text>
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
  content: {
    alignItems: "center",
    justifyContent: "center",
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
