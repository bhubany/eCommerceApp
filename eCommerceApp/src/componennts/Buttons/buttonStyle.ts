import {COLORS} from 'common/enums';
import {ButtonProps} from './button.d';
import {Text, View} from 'react-native';
import styled from 'styled-components';

export const ButtonContainer = styled(View)`
  position: initial;
  padding: 4px;
  gap: 8px;
`;

export const ButtonWrapper = styled(View)<ButtonProps>`
  width: ${props => (props.width ? props.width : '100px')};
  height: ${props => (props.height ? props.height : '30px')};
  background-color: ${props =>
    props.outlined
      ? null
      : props.backgroundColor
      ? props.backgroundColor
      : COLORS.PRIMARY};
  border: solid
    ${props => (props.borderColor ? props.borderColor : COLORS.PRIMARY)}
    ${props => (props.borderWidth ? props.borderWidth : '2px')};
  border-radius: ${props => (props.borderRadius ? props.borderRadius : '6px')};
  color: ${props => (props.color ? props.color : COLORS.PRIMARY)};
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: row;
`;

export const ButtonIconWrapper = styled(View)``;

export const ButtonTextWrapper = styled(Text)<ButtonProps>`
  color: ${props => (props.color ? props.color : COLORS.PRIMARY)};
`;
