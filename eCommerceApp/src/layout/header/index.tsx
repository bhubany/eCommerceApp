import React from 'react';
import {HeaderContainer, HeaderTitleWrapper, HeaderText} from './header.styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Header() {
  return (
    <HeaderContainer>
      <HeaderTitleWrapper>
        <MaterialIcons name="all-inclusive" color={'#fff'} size={30} />
        <HeaderText>Infinity Shop</HeaderText>
      </HeaderTitleWrapper>
    </HeaderContainer>
  );
}
