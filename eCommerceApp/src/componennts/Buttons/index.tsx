import React from 'react';
import {
  ButtonContainer,
  ButtonIconWrapper,
  ButtonTextWrapper,
  ButtonWrapper,
} from './buttonStyle';
import {ButtonProps} from './button';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function MyButton(props: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={() => (props.handleClick ? props.handleClick() : null)}>
      <ButtonContainer>
        <ButtonWrapper {...props}>
          <ButtonIconWrapper>{props.icon ?? null}</ButtonIconWrapper>
          <ButtonTextWrapper {...props}>
            {props.title ?? 'My Button'}
          </ButtonTextWrapper>
        </ButtonWrapper>
      </ButtonContainer>
    </TouchableOpacity>
  );
}
