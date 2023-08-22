import {COLORS} from 'common/enums';
import {Image, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components';

export const CartCrdCntnr = styled(View)`
  width: 98%;
  height: 130px;
  background-color: #ffffff;
  border-radius: 8px;
  shadow-color: #000000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 5; //for android devices
  padding: 10px;
`;

export const CartCrdWrpr = styled(View)`
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ImgWrpr = styled(Image)`
  width: 30%;
  height: 90px;
  border-radius: 10px;
`;

export const CntntWrpr = styled(View)`
  width: 65%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CntntDetails = styled(View)`
  width: 85%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const DescWrpr = styled(View)`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const CardAction = styled(View)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const IconWrapper = styled(TouchableOpacity)<{borderColor?: string}>`
  border: solid 1px
    ${props => (props.borderColor ? props.borderColor : COLORS.SUCCESS)};
  padding: 1px;
`;
