import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loginState} from 'store/selectors';
import {userLogin} from 'store/actions';
import {AnyAction} from 'redux';
import {UserDetails, UserLoginValue} from 'common/types';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {RootState} from 'store';

export default function SignIn() {
  const login: UserDetails = useSelector(loginState);
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const loginDetails: UserLoginValue = {
    email: 'yadav.bhuban@gmail.com',
    password: 'bhubany',
    userId: null,
  };

  const handleUserLogin = () => {
    dispatch(userLogin(loginDetails));
  };

  useEffect(() => {
    console.log('login state:', login);
  }, [login]);

  return (
    <View>
      <Text
        style={{padding: 20, borderWidth: 0.5}}
        onPress={() => {
          handleUserLogin();
        }}>
        SignIn
      </Text>
    </View>
  );
}
