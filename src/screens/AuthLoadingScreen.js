import React from 'react';
import { ActivityIndicator } from 'react-native';
import Background from '../components/Background';
import { theme } from '../core/theme';
import app from 'firebase/app';
import 'firebase/auth';

export default function AuthLoadingScreen({ navigation }) {
  app.auth().onAuthStateChanged((user) => {
    console.log(user);
    if (user) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'AdminScreen' }],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'StartScreen' }],
      });
    }
  });

  return (
    <Background>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </Background>
  );
}
