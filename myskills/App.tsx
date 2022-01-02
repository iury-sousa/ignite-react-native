import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { Home } from './src/pages/home';
import SplashScreen from 'react-native-splash-screen';

export function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Home />
    </>
  );
}
