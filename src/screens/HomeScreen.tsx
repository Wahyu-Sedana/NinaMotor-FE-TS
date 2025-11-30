import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useStore } from "../stores/RootStore";
import { Text } from "@/components/GlobalUI";

export const HomeScreen = () => {
  const { userStore } = useStore();
  return (
    <>
      <SafeAreaView style={style.container}>
        <Text style={style.textHome}>
          {userStore.user ? `Hello, ${userStore.user.nama}!` : "Hello, Guest!"}
        </Text>
      </SafeAreaView>
    </>
  );
};

const style = StyleSheet.create({
  container: {
    margin: 10,
  },
  textHome: {
    textAlign: "center",
  },
});
