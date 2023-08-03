import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SignIn from 'screens/signin';
import SignUp from 'screens/signup';
import {UserDetails} from 'common/types';
import {loginState} from 'store/selectors';
import {useSelector} from 'react-redux';

const Drawer = createDrawerNavigator();

const ProtectedNavigation = () => {
  const login: UserDetails = useSelector(loginState);

  return (
    <Drawer.Navigator screenOptions={{headerShown: false}}>
      {!login.isLogined ? (
        <>
          <Drawer.Screen name="signin" component={SignIn} />
          <Drawer.Screen name="signup" component={SignUp} />
        </>
      ) : null}
    </Drawer.Navigator>
  );
};

export default ProtectedNavigation;
