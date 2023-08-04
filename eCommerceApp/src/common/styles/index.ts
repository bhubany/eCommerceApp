import {View, ViewProps} from 'react-native';
import styled from 'styled-components';

interface HorizontalLineProps extends ViewProps {
  height?: string;
  backgroundColor?: string;
}

export const HorizontalLine = styled(View)<HorizontalLineProps>`
  height: ${props => (props.height ? props.height : '1px')};
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : '#00f'};
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

export const AlignHorizontallyCenter = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const AlignVerticallyCenter = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
