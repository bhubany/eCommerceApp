import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from 'screens/home';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomMenuItem from './../componennts/navigation';

const Drawer = createDrawerNavigator();
const HomeIcon = ({color = '', size = 24}) => (
  <MaterialIcons name="home" color={color} size={size} />
);
const ProfileIcon = ({color = '', size = 24}) => (
  <MaterialIcons name="person" color={color} size={size} />
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
        name="Home"
        component={Home}
        options={{
          lazy: true,
          drawerIcon: HomeIcon,
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Home}
        options={{
          lazy: true,
          drawerIcon: ProfileIcon,
        }}
      />
    </Drawer.Navigator>
  );
};

export default PublicNavigation;
