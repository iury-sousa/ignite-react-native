import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Confirmation } from "../screens/Confirmation";
import { SignIn } from "../screens/SignIn";
import { SignUpFirstStep } from "../screens/SignUp/FirstStep";
import { SignUpSecondStep } from "../screens/SignUp/SecondStep";
import { Splash } from "../screens/Splash";

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
      <Screen name="Splash" component={Splash} />
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SignUpFirstStep" component={SignUpFirstStep} />
      <Screen name="SignUpSecondStep" component={SignUpSecondStep} />
      <Screen name="Confirmation" component={Confirmation} />
    </Navigator>
  );
}
