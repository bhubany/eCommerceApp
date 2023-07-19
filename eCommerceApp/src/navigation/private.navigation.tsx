import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from 'screens/home';
import SignIn from 'screens/signin';
import SignUp from 'screens/signup';

const Drawer = createDrawerNavigator();

const PrivateNavigation = () => {
  return (
    <Drawer.Navigator screenOptions={{headerShown: false}}>
      <Drawer.Screen name="homep" component={Home} />
      <Drawer.Screen name="signinp" component={SignIn} />
      <Drawer.Screen name="signupp" component={SignUp} />
    </Drawer.Navigator>
  );
};

export default PrivateNavigation;
