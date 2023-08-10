import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ButtonProps} from './button';
import {
  ButtonContainer,
  ButtonIconWrapper,
  ButtonTextWrapper,
  ButtonWrapper,
} from './buttonStyle';

export default function MyButton(props: ButtonProps) {
  return (
    <TouchableOpacity
      style={{opacity: props.disabled ? 0.5 : 1}}
      disabled={props.disabled ?? false}
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
