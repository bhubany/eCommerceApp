import {COLORS} from 'common/enums';
import {Text, View, ViewProps} from 'react-native';
import styled from 'styled-components';
import {TextCntntProps} from './styles';

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

export const AlignHorizontallySpaceBtn = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const AlignVerticallyCenter = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const AlignVerticallySpaceBtn = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const TextContent = styled(Text)<TextCntntProps>`
  color: ${props => (props.color ? props.color : COLORS.BLACK)};
  font-size: ${props => (props.fontSize ? props.fontSize : '14px')};
  font-weight: ${props => (props.fontWeight ? props.fontWeight : 'bold')};
  text-align: ${props => (props.textAlign ? props.textAlign : 'left')};
  text-decoration: ${props =>
    props.textDecoration ? props.textDecoration : 'none'};
  overflow: hidden;
`;
