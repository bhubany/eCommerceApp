import {View, ScrollView} from 'react-native';
import styled from 'styled-components';

export const LayoutContainer = styled(View)`
  height: 100%;
  width: 100%;
`;

export const LayoutContent = styled(ScrollView)`
  border-color: #1976d2;
  border-width: 3px;
  padding-left: 10px;
  padding-right: 10px;
  height: 100%;
  width: 100%;
`;
