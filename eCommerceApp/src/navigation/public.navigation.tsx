import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from 'screens/home';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomMenuItem from './../componennts/navigation';
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from 'screens/signin';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const HomeIcon = ({color = '', size = 24}) => (
  <MaterialIcons name="home" color={color} size={size} />
);
const TrackOrderIcon = ({color = '', size = 24}) => (
  <MaterialIcons name="local-shipping" color={color} size={size} />
);

const PublicNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomMenuItem {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: '#1976d2',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#1976d2',
        drawerLabelStyle: {marginLeft: 10},
        headerShown: false,
      }}>
      <Drawer.Screen
        name="home"
        component={PublicStackNavigation}
        options={{
          title: 'Home',
          lazy: true,
          drawerIcon: HomeIcon,
        }}
      />
      <Drawer.Screen
        name="trackOrder"
        component={SignIn}
        options={{
          lazy: true,
          title: 'Track My Order',
          drawerIcon: TrackOrderIcon,
        }}
      />
    </Drawer.Navigator>
  );
};

export const PublicStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="homeScreen" component={SignIn} />
      <Stack.Screen name="signin" component={SignIn} />
      <Stack.Screen name="profile" component={SignIn} />
    </Stack.Navigator>
  );
};

export default PublicNavigation;
