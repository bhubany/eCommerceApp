import {COLORS} from 'common/enums';
import {View} from 'react-native';
import styled from 'styled-components';

export const CartContainer = styled(View)`
  width: 100%;
  flex: 1;
`;

export const CartCntntCntnr = styled(View)`
  padding: 10px;
`;

export const CartDetlsWrpr = styled(View)`
  padding: 4px 60px;
  border: 1px solid ${COLORS.LIGHT_GREY};
  border-radius: 16px;
  margin-bottom: 16px;
  gap: 5px;
`;

export const CartCardContainer = styled(View)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  padding-bottom: 180px;
`;

export const FooterWrapper = styled(View)`
  width: 100%;
  margin-top: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.LIGHT_GREY};
  padding-top: 10px;
`;
