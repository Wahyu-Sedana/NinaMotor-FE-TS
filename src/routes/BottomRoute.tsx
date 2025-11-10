import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export type BottomTabParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();
