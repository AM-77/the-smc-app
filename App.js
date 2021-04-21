import React from 'react';
import { View, StyleSheet, LogBox } from 'react-native';
import { Provider } from 'react-native-paper';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from 'firebase/app';
import { theme } from './src/core/theme';
import {
  AuthLoadingScreen,
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  AdminScreen,
  ScaningScreen,
  DashboardScreen,
  DisplayMemberScreen,
} from './src/screens';
import { FIREBASE_CONFIG } from './src/core/firebase';

const Stack = createStackNavigator();

if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG);
}

LogBox.ignoreLogs(['Setting a timer']);
const _console = { ...console };
console.warn = (message) => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

export default function App() {
  return (
    <Provider theme={theme}>
      <View style={styles.mainContainer}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="AuthLoadingScreen"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen
              name="AuthLoadingScreen"
              component={AuthLoadingScreen}
            />
            <Stack.Screen name="StartScreen" component={StartScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="AdminScreen" component={AdminScreen} />
            <Stack.Screen name="ScaningScreen" component={ScaningScreen} />
            <Stack.Screen
              name="DisplayMemberScreen"
              component={DisplayMemberScreen}
            />
            <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
            <Stack.Screen
              name="ResetPasswordScreen"
              component={ResetPasswordScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: getStatusBarHeight(),
  },
});
