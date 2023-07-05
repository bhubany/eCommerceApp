import {View, ScrollView} from 'react-native';
import styled from 'styled-components';

export const LayoutContainer = styled(View)`
  height: 100%;
`;

export const LayoutContent = styled(ScrollView)`
  border-radius: 5px;
  border-color: #1976d2;
  margin-left: 10px;
  margin-right: 10px;
`;
