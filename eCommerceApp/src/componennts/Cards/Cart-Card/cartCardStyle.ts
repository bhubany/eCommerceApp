import {Image, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components';

export const CartCrdCntnr = styled(TouchableOpacity)`
  padding: 0 !important;
  margin: 0 !important;
  width: 100% !important;
`;

export const CartCrdWrpr = styled(View)`
  width: 98%;
  height: 90px;
  background-color: #ffffff;
  border-radius: 8px;
  shadow-color: #000000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 5; //for android devices
  padding: 10px;
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

export const ImgWrpr = styled(Image)`
  width: 30%;
  height: 100%;
  border-radius: 10px;
`;

export const CntntWrpr = styled(View)`
  width: 65%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const DescWrpr = styled(View)`
  width: 85%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
