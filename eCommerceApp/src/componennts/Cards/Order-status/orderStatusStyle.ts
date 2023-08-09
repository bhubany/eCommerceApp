import {COLORS} from 'common/enums';
import {Text, View} from 'react-native';
import styled from 'styled-components';
import {OrderStatusProps} from './orderStatus';

export const OrderStausContainer = styled(View)`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

export const OrderStausIconWrapper = styled(View)`
  width: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const OrderStausLeftBorder = styled(View)<OrderStatusProps>`
  border: ${props => (props.progressStyle ? props.progressStyle : 'dashed')}
    ${props => (props.progressColor ? props.progressColor : COLORS.GREY)}
    ${props => (props.progressWidth ? props.progressWidth : '2px')};
  height: ${props => (props.progressWidth ? props.progressWidth : '40px')};
  width: 0px;
`;

export const OrderStausDetails = styled(View)`
  width: 80%;
`;

export const OrderStausText = styled(Text)<OrderStatusProps>`
  padding: ${props => (props.padding ? props.padding : '5px 10px 5px 5px')};
  margin: ${props => (props.margin ? props.margin : '0px')};
  flex-wrap: wrap;
  font-size: ${props => (props.fontSize ? props.fontSize : '18px')};
  line-height: ${props => (props.lineHeight ? props.lineHeight : '24px')};
  font-weight: ${props => (props.fontWeight ? props.fontWeight : '600')};
  color: ${props => (props.textColor ? props.textColor : COLORS.GREY)};
  text-decoration: ${props =>
    props.textDecoration ? props.textDecoration : 'none'};
  font-family: ${props => (props.fontFamily ? props.fontFamily : 'default')};
  text-align: ${props => (props.textAlign ? props.textAlign : 'left')};
  height: ${props => (props.textHeight ? props.textHeight : '')};
  width: ${props => (props.textWidth ? props.textWidth : '')};
  overflow: ${props => (props.overflow ? props.overflow : 'visible')};
`;
