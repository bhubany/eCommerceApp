import {View} from 'react-native';
import styled from 'styled-components';

export const HomeContainer = styled(View)`
  width: 100%;
`;
export const HomeWrapper = styled(View)`
  padding: 5px;
`;
export const CarouselWrapper = styled(View)`
  margin-bottom: 10px;
`;

export const ProductCardWrapper = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  row-gap: 16px;
`;
export const LoadMoreBtnContainer = styled(View)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
`;
