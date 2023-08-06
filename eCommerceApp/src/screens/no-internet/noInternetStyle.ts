import {COLORS} from 'common/enums';
import {ImageBackground, View} from 'react-native';
import {Text} from 'react-native-elements';
import styled from 'styled-components';

export const NoInternetContainer = styled(View)`
  width: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const NoInternetWrapper = styled(View)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const NoInternateBgImageWrapper = styled(ImageBackground)`
  height: 100px;
  width: 100px;
`;

export const NoInternateTextWrapper = styled(Text)`
  margin-top: 10px;
  width: 60%;
  font-size: 18px;
  font-weight: bold;
  color: ${COLORS.ERROR};
  text-align: center;
`;

export const NoInternateHeaderWrapper = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const HeaderTextWrapper = styled(Text)`
  font-size: 30px;
  font-weight: bold;
  color: ${COLORS.PRIMARY};
  text-align: center;
`;
