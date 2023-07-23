import {Text, View, TouchableOpacity} from 'react-native';
import styled from 'styled-components';

export const HeaderContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #1976d2;
  height: 60px;
`;

export const HeaderTitleWrapper = styled(View)`
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding-right: 16px;
`;

export const HeaderText = styled(Text)`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
`;

export const OpenMenuContainer = styled(TouchableOpacity)`
  padding-left: 16px;
`;
