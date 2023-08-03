import {View} from 'react-native';
import {Text} from 'react-native-elements';
import styled from 'styled-components';
import {CheckBoxProps} from './checkbox';
import {COLORS} from 'common/enums';

export const CheckBoxContainer = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;
export const CheckBoxWrapper = styled(View)<CheckBoxProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: ${props => (props.width ? props.width : '20px')};
  height: ${props => (props.height ? props.height : '20px')};
  border-width: ${props => (props.borderWidth ? props.borderWidth : '1px')};
  border-color: ${props =>
    props.borderColor ? props.borderColor : COLORS.BLACK};
  border-radius: ${props => (props.borderWidth ? props.borderWidth : '0px')};
  background-color: ${props =>
    props.filled
      ? props.backgroundColor
        ? props.backgroundColor
        : COLORS.PRIMARY
      : 'none'};
`;

export const CheckBoxTick = styled(Text)<CheckBoxProps>`
  color: ${props => (props.checkColor ? props.checkColor : COLORS.SUCCESS)};
  font-size: ${props => (props.checkFontSize ? props.checkFontSize : '15px')};
  font-weight: bold;
`;
export const CheckBoxLabel = styled(Text)<CheckBoxProps>`
  color: ${props => (props.textColor ? props.textColor : COLORS.BLACK)};
  font-size: ${props => (props.textFontSize ? props.textFontSize : '16px')};
  font-weight: bold;
  flex-wrap: wrap;
`;
