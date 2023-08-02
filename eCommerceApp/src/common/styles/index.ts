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
