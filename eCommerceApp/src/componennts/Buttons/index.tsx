import React from 'react';
import {ButtonProps} from './button';
import {
  ButtonContainer,
  ButtonIconWrapper,
  ButtonTextWrapper,
  ButtonWrapper,
} from './buttonStyle';

export default function MyButton({
  disabled,
  handleClick,
  icon,
  ...props
}: ButtonProps) {
  return (
    <ButtonContainer
      style={{opacity: disabled ? 0.5 : 1}}
      disabled={disabled ?? false}
      onPress={() => (handleClick ? handleClick() : null)}>
      <ButtonWrapper {...props}>
        {icon && <ButtonIconWrapper>{icon}</ButtonIconWrapper>}
        <ButtonTextWrapper {...props}>
          {props.title ?? 'My Button'}
        </ButtonTextWrapper>
      </ButtonWrapper>
    </ButtonContainer>
  );
}
