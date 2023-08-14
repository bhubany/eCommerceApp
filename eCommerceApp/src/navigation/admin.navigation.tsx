import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import Home from 'screens/home';

const Drawer = createDrawerNavigator();

const AdminNavigation = () => {
  return (
    <Drawer.Navigator screenOptions={{headerShown: false}}>
      <Drawer.Screen name="dashboard" component={Home} />
    </Drawer.Navigator>
  );
};

export default AdminNavigation;
