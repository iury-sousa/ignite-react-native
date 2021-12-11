import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import AppLoading from "expo-app-loading";
import "intl";
import "intl/locale-data/jsonp/pt-BR";
import React from "react";
import { ThemeProvider } from "styled-components/native";
import { AuthProvider, useAuth } from "./src/contexts/AuthContext";
import theme from "./src/global/styles/theme";
import { Routes } from "./src/routes";

export function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const { storageUserLoading } = useAuth();

  if (!fontsLoaded || storageUserLoading) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        {/* <StatusBar barStyle="dark-content" /> */}
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}
