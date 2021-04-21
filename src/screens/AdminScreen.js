import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconButton, TouchableRipple } from 'react-native-paper';
import { logoutUser } from '../api/auth-api';
import { theme } from '../core/theme';
import DashboardScreen from './DashboardScreen';
import ScaningScreen from './ScaningScreen';
import DisplayMemberScreen from './DisplayMemberScreen';
import EditMemberScreen from './EditMemberScreen';
import CreateMemberScreen from './CreateMemberScreen';

const Tab = createBottomTabNavigator();

function TabBar({ navigation, state }) {
  const { index, routeNames } = state;

  return (
    <View style={styles.tabBar}>
      <View>
        <IconButton
          icon="view-dashboard-outline"
          color={
            routeNames[index] === 'DashboardScreen'
              ? theme.colors.primary
              : theme.colors.text
          }
          size={30}
          onPress={() => navigation.navigate('DashboardScreen')}
        />
      </View>
      <View>
        <IconButton
          icon="qrcode-scan"
          color={
            routeNames[index] === 'ScaningScreen'
              ? theme.colors.primary
              : theme.colors.text
          }
          size={30}
          onPress={() => navigation.navigate('ScaningScreen')}
        />
      </View>
      <View>
        <IconButton
          icon="logout-variant"
          color={theme.colors.text}
          size={30}
          onPress={() => logoutUser()}
        />
      </View>
    </View>
  );
}

export default function AdminScreen(props) {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen name="DashboardScreen" component={DashboardScreen} />
      <Tab.Screen name="ScaningScreen" component={ScaningScreen} />
      <Tab.Screen name="DisplayMemberScreen" component={DisplayMemberScreen} />
      <Tab.Screen name="EditMemberScreen" component={EditMemberScreen} />
      <Tab.Screen name="CreateMemberScreen" component={CreateMemberScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: theme.colors.white,
    paddingVertical: 4,
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: theme.colors.bgTransparent,
  },
});
