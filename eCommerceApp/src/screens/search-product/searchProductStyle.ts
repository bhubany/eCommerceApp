import {COLORS} from 'common/enums';
import {TextInput, View} from 'react-native';
import {Text} from 'react-native-elements';
import styled from 'styled-components';

export const SearchProductContainer = styled(View)``;
export const SearchProductFormWrapper = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 100%;
`;
export const InputWrapper = styled(TextInput)`
  border: solid ${COLORS.BLACK} 1px;
  border-radius: 10px;
  height: 35px;
  text-align: center;
  width: 65%;
  padding: 0 !important;
  margin: 0 !important;
`;

export const ProductLoaderWrapper = styled(View)`
  margin-top: 100px;
  padding: 30px;
  width: 100%;
  display: flex;
`;

export const ProductCardWrapper = styled(View)`
  padding-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  row-gap: 16px;
`;

export const NoProductFoundWrapper = styled(View)`
  padding: 20px;
  text-align: center;
`;

export const NoProductFoundTextWrapper = styled(Text)`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: ${COLORS.ERROR};
`;
