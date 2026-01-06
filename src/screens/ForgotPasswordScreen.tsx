import { RedButton } from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import CustomLogo from "@/components/CustomLogo";
import { useAppNavigation } from "@/helpers/UseAppNavigation";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ForgotPasswordScreen = () => {
  const navigation = useAppNavigation();
  return (
    <View style={styles.container}>
      <CustomLogo
        title="NinaMotor"
        subtitle="Please enter your email to reset password"
        iconName="motorbike"
        iconColor="#DC2626"
        backgroundColor="#FFFFFF"
      />

      <View style={styles.formContainer}>
        <CustomInput
          name="mail-outline"
          placeholder="Email"
          value={""}
          onChangeText={() => {}}
          keyboardType="email-address"
        />

        <RedButton title="Login" onPress={() => {}} />

        <View style={styles.containerRegister}>
          <Text style={styles.text}>Back to Login? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.linkText}>Login Now </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

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

export default ForgotPasswordScreen;
