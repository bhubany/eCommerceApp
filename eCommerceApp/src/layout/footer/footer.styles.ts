import {COLORS} from 'common/enums';
import {Text, View} from 'react-native';
import styled from 'styled-components';

export const FooterContainer = styled(View)`
  background-color: ${COLORS.SECONDARY};
  height: 45px;
  align-items: center;
  justify-content: center;
`;

export const FooterText = styled(Text)`
  color: ${COLORS.WHITE};
  font-size: 14px;
`;
