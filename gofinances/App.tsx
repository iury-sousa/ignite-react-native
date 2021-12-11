import "intl";
import "intl/locale-data/jsonp/pt-BR";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import React from "react";
import { ThemeProvider } from "styled-components/native";
import theme from "./src/global/styles/theme";
import { AppRoutes } from "./src/routes/app.routes";
import { StatusBar } from "react-native";

export function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        {/* <StatusBar barStyle="dark-content" /> */}
        <AppRoutes />
      </NavigationContainer>
    </ThemeProvider>
  );
}
