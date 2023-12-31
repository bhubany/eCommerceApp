import {NavigationContainer} from '@react-navigation/native';
import PublicNavigation from 'navigation/public.navigation';
import React, {useState} from 'react';
import PrivateNavigation from './private.navigation';

const Navigation = () => {
  const [isLoggedIn, setIsloggedIn] = useState(false);

  return (
    <NavigationContainer>
      {isLoggedIn ? <PrivateNavigation /> : <PublicNavigation />}
    </NavigationContainer>
  );
};

export default Navigation;
