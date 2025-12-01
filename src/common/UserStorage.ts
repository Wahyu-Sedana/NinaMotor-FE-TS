import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "token";

export async function persistToken(token: string) {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
}

export async function eraseToken() {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}

export async function getToken() {
  return await SecureStore.getItemAsync(TOKEN_KEY);
}
