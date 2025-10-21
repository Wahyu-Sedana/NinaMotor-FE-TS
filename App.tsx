import React from "react";
import { StatusBar } from "expo-status-bar";
import { AppRouter } from "./src/routes/AppRoute";
import { StoreProvider } from "./src/stores/RootStore";

export default function App() {
  return (
    <StoreProvider>
      <StatusBar style="auto" />
      <AppRouter />
    </StoreProvider>
  );
}
