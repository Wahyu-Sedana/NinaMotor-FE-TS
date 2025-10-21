import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "token";
export function persistToken(token: string) {
  SecureStore.setItemAsync(TOKEN_KEY, token);
}

export function eraseToken() {
  SecureStore.deleteItemAsync(TOKEN_KEY);
}

export function getToken() {
  const token = SecureStore.getItemAsync(TOKEN_KEY);

  return token;
}
