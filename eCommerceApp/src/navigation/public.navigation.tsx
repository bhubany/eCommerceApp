import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from 'screens/home';
import SignIn from 'screens/signin';
import SignUp from 'screens/signup';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Drawer = createDrawerNavigator();
const HomeIcon = () => <MaterialIcons name="home" color={'blue'} size={24} />;
const PublicNavigation = () => {
  return (
    <Drawer.Navigator screenOptions={{headerShown: false}}>
      <Drawer.Screen
        name="home"
        component={Home}
        options={{
          lazy: true,
          drawerIcon: HomeIcon,
        }}
      />
      <Drawer.Screen name="signin" component={SignIn} />
      <Drawer.Screen name="signup" component={SignUp} />
    </Drawer.Navigator>
  );
};

export default PublicNavigation;
