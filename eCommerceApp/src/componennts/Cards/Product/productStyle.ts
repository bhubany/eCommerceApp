import {COLORS} from 'common/enums';
import {Image, Text, View} from 'react-native';
import styled from 'styled-components';
import {ProductCardProps} from './productCard';

export const ProductCardContainer = styled(View)`
  width: 180px;
  height: 200px;
  background-color: #ffffff;
  border-radius: 8px;
  shadow-color: #000000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 5; //for android devices
`;
export const ProductCardWrapper = styled(View)`
  padding: 5px;
`;

export const ProductCardImageWrapper = styled(View)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
`;

export const ProductCardImage = styled(Image)`
  width: 100%;
  height: 100px;
  object-fit: contain;
  border-radius: 5px;
`;

export const ProductCardContentWrapper = styled(View)`
  width: 100%;
`;

export const ProductCardContentText = styled(Text)<ProductCardProps>`
  color: ${props => (props.color ? props.color : COLORS.BLACK)};
  font-size: ${props => (props.fontSize ? props.fontSize : '14px')};
  font-weight: ${props => (props.fontWeight ? props.fontWeight : 'bold')};
  text-align: ${props => (props.textAlign ? props.textAlign : 'left')};
  text-decoration: ${props =>
    props.textDecoration ? props.textDecoration : 'none'};
  height: 45px;
  overflow: hidden;
  padding: 0 10px;
`;
