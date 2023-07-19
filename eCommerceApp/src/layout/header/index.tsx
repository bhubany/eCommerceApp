import React from 'react';
import {
  HeaderContainer,
  HeaderTitleWrapper,
  HeaderText,
  OpenMenuContainer,
} from './header.styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';

type DrawerNavigation = DrawerNavigationProp<any>;
export interface HeaderProps {
  navigation: DrawerNavigation;
}

export default function Header() {
  const navigation = useNavigation<DrawerNavigation>();

  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <HeaderContainer>
      <OpenMenuContainer onPress={openDrawer}>
        <MaterialIcons name="menu" color={'white'} size={30} />
      </OpenMenuContainer>
      <HeaderTitleWrapper>
        <MaterialIcons name="all-inclusive" color={'#fff'} size={30} />
        <HeaderText>Infinity Shop</HeaderText>
      </HeaderTitleWrapper>
    </HeaderContainer>
  );
}
