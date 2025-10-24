import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { observer } from "mobx-react-lite";
import { Formik } from "formik";
import { RedButton } from "../components/CustomButton";
import { useAppNavigation } from "../helpers/UseAppNavigation";
import CustomInput from "../components/CustomInput";
import CustomLogo from "../components/CustomLogo";
import { useStore } from "../stores/RootStore";
import { registerValidation } from "../helpers/validations/Validation";

const RegisterScreen = observer(() => {
  const navigation = useAppNavigation();
  const { userStore } = useStore();

  const handleRegister = async (values: {
    email: string;
    nama: string;
    password: string;
    cPassword: string;
    noTelp: string;
  }) => {
    const res = await userStore.register(
      values.nama,
      values.email,
      values.password,
      values.cPassword,
      values.noTelp
    );

    if (res.success) {
      Alert.alert("Success", "Account created successfully!", [
        {
          text: "OK",
          onPress: () => navigation.replace("Login"),
        },
      ]);
    } else {
      Alert.alert("Register failed", res.message);
    }
  };

  return (
    <View style={styles.container}>
      <CustomLogo
        title="NinaMotor"
        subtitle="Create your account"
        iconName="motorbike"
        iconColor="#DC2626"
        backgroundColor="#FFFFFF"
      />

      <Formik
        initialValues={{
          nama: "",
          email: "",
          password: "",
          cPassword: "",
          noTelp: "",
        }}
        validationSchema={registerValidation}
        onSubmit={handleRegister}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <View style={styles.formContainer}>
            <CustomInput
              name="person-outline"
              placeholder="Full Name"
              value={values.nama}
              onChangeText={handleChange("nama")}
            />
            {touched.nama && errors.nama && (
              <Text style={styles.errorText}>{errors.nama}</Text>
            )}

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
              name="call-outline"
              placeholder="Phone Number"
              value={values.noTelp}
              onChangeText={handleChange("noTelp")}
              keyboardType="phone-pad"
            />
            {touched.noTelp && errors.noTelp && (
              <Text style={styles.errorText}>{errors.noTelp}</Text>
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

            <CustomInput
              name="lock-closed-outline"
              placeholder="Confirm Password"
              value={values.cPassword}
              onChangeText={handleChange("cPassword")}
              secureTextEntry
            />
            {touched.cPassword && errors.cPassword && (
              <Text style={styles.errorText}>{errors.cPassword}</Text>
            )}

            <RedButton title="Register" onPress={() => handleSubmit()} />

            <View style={styles.containerRegister}>
              <Text style={styles.text}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.linkText}>Login</Text>
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

export default RegisterScreen;
