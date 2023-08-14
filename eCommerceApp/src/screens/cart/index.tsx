import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text} from 'react-native';
import NavHeader from '../../componennts/Nav-Header';
import {CartContainer} from './cartStyle';

const Cart = () => {
  const navigation = useNavigation();
  return (
    <CartContainer>
      <NavHeader title="My Cart" handleClick={() => navigation.goBack()} />
      <Text>Cart</Text>
    </CartContainer>
  );
};

export default Cart;
