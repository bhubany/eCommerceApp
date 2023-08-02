import {
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
  Text,
} from 'react-native';
import styled from 'styled-components';

export const CustomMenuContainer = styled(TouchableOpacity)`
  flex: 1;
`;

export const MenueBgImageWrapper = styled(ImageBackground)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

export const UserImageWrapper = styled(Image)`
  width: 80px;
  height: 80px;
  // border: solid blue 1px;
  border-radius: 50px;
`;

export const UserNameWrapper = styled(Text)`
  color: orange;
  // background-color: blue;
  font-size: 20px;
  font-weight: bold;
`;

export const DrawerListWrapper = styled(View)`
  background-color: #fff;
  padding-top: 10px;
`;

export const DrawerFooterListWrapper = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

export const DrawerFooterItemWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

export const DrawerFooterItemContent = styled(Text)`
  font-size: 14px;
  font-weight: bold;
  color: #1976d2;
`;
