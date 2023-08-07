import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Home from 'screens/home';
import Profile from 'screens/profile';
import SearchProducts from 'screens/search-product';
import SignIn from 'screens/signin';
import SignUp from 'screens/signup';
import CustomMenuItem from './../componennts/navigation';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const HomeIcon = ({color = '', size = 24}) => (
  <MaterialIcons name="home" color={color} size={size} />
);
const TrackOrderIcon = ({color = '', size = 24}) => (
  <MaterialIcons name="local-shipping" color={color} size={size} />
);

const SearchIcon = ({color = '', size = 24}) => (
  <MaterialIcons name="search" color={color} size={size} />
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
      <Drawer.Screen
        name="searchProducts"
        component={SearchProducts}
        options={{
          lazy: true,
          title: 'Search My Products',
          drawerIcon: SearchIcon,
        }}
      />
    </Drawer.Navigator>
  );
};

export const PublicStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="homeS" component={SearchProducts} />
      <Stack.Screen name="homeScreen" component={Home} />
      <Stack.Screen name="signin" component={SignIn} />
      <Stack.Screen name="signup" component={SignUp} />
      <Stack.Screen name="profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default PublicNavigation;
