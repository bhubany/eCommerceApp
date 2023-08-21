import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text} from 'react-native';
import NavHeader from '../../componennts/Nav-Header';
import {PlaceOrderProps} from './placeOrder';
import {PlaceOrderCntnr} from './placeOrderStyle';

const PlaceOrder: React.FC<PlaceOrderProps> = ({fromScreen}) => {
  const navigation = useNavigation();

  //TODO: manage navigation go back properly
  const handleNavigateBack = () =>
    fromScreen ? navigation.navigate(fromScreen as never) : navigation.goBack();

  return (
    <PlaceOrderCntnr>
      <NavHeader title="Place order" handleClick={handleNavigateBack} />
      <Text>PlaceOrder</Text>
    </PlaceOrderCntnr>
  );
};

export default PlaceOrder;
