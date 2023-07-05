import {Text, View} from 'react-native';
import styled from 'styled-components';

export const HeaderContainer = styled(View)`
  background-color: #1976d2;
  height: 60px;
  justify-content: center;
`;

export const HeaderTitleWrapper = styled(View)`
  display: flex;
  flex-direction: row;
  margin-left: auto;
  gap: 10px;
  margin-right: 30px;
`;

export const HeaderText = styled(Text)`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
`;
