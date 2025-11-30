import React from "react";
import { TextInput, TextInputProps } from "react-native";

export function AppTextInput(props: TextInputProps) {
  return <TextInput allowFontScaling={false} {...props} />;
}
