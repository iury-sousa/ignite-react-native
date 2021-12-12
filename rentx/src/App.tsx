import React from "react";

import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
} from "@expo-google-fonts/inter";
import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold,
} from "@expo-google-fonts/archivo";
import AppLoading from "expo-app-loading";

import { Home } from "./screens/Home";
import { ThemeProvider } from "styled-components/native";
import theme from "./styles/theme";
import { CardDetails } from "./screens/CardDetails";
import { Scheduting } from "./screens/Scheduting";
import { SchedulingDetails } from "./screens/SchedulingDetails";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      {/* <Home /> */}
      {/* <CardDetails /> */}
      {/* <Scheduting /> */}
      <SchedulingDetails />
    </ThemeProvider>
  );
}
