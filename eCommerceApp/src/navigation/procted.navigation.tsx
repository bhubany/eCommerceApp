import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SignIn from 'screens/signin';
import SignUp from 'screens/signup';

const Drawer = createDrawerNavigator();

const ProtectedNavigation = () => {
  return (
    <Drawer.Navigator screenOptions={{headerShown: false}}>
      <Drawer.Screen name="signin" component={SignIn} />
      <Drawer.Screen name="signup" component={SignUp} />
    </Drawer.Navigator>
  );
};

export default ProtectedNavigation;
