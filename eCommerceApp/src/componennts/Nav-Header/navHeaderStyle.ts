import {COLORS} from 'common/enums';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styled from 'styled-components';

export const NavHeaderContainer = styled(View)`
  width: 100%;
  background-color: ${COLORS.PRIMARY};
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 0 5px 10px;
`;
export const IconWrapper = styled(TouchableOpacity)``;
export const TitleWrapper = styled(View)`
  width: 100%;
  display: flex;
  align-items: center;
`;
