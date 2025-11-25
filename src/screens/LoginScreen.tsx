import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
} from "react-native";
import { observer } from "mobx-react-lite";
import { Formik } from "formik";
import * as Application from "expo-application";
import { RedButton } from "../components/CustomButton";
import { useAppNavigation } from "../helpers/UseAppNavigation";
import CustomInput from "../components/CustomInput";
import CustomLogo from "../components/CustomLogo";
import { useStore } from "../stores/RootStore";
import { loginValidation } from "../helpers/validations/Validation";
import { log } from "../helpers/Logger";

const LoginScreen = observer(() => {
  const navigation = useAppNavigation();
  const { userStore } = useStore();

  const handleLogin = async (values: { email: string; password: string }) => {
    let phoneId: string | null = null;

    if (Platform.OS === "android") {
      phoneId = Application.getAndroidId();
    } else {
      phoneId = await Application.getIosIdForVendorAsync();
    }

    const res = await userStore.login(
      values.email,
      values.password,
      phoneId ?? ""
    );

    if (res.success === true) {
      navigation.replace("Home");
    } else {
      Alert.alert("Login gagal", res.message);
    }
  };

  return (
    <View style={styles.container}>
      <CustomLogo
        title="NinaMotor"
        subtitle="Welcome Back"
        iconName="motorbike"
        iconColor="#DC2626"
        backgroundColor="#FFFFFF"
      />

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginValidation}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <View style={styles.formContainer}>
            <CustomInput
              name="mail-outline"
              placeholder="Email"
              value={values.email}
              onChangeText={handleChange("email")}
              keyboardType="email-address"
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <CustomInput
              name="lock-closed-outline"
              placeholder="Password"
              value={values.password}
              onChangeText={handleChange("password")}
              secureTextEntry
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>

            <RedButton title="Login" onPress={() => handleSubmit()} />

            <View style={styles.containerRegister}>
              <Text style={styles.text}>Don’t have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.linkText}>Register now</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    justifyContent: "center",
    padding: 20,
  },
  formContainer: { width: "100%" },
  forgotPassword: { color: "#DC2626", textAlign: "right", marginBottom: 24 },
  errorText: {
    color: "#DC2626",
    fontSize: 12,
    marginBottom: 8,
    marginTop: -8,
  },
  containerRegister: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  text: {
    color: "#555",
    fontSize: 14,
  },
  linkText: {
    color: "#DC2626",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default LoginScreen;
