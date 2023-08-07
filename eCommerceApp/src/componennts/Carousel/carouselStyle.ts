import {View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styled from 'styled-components';
import {CarouselProps} from './carousel';

export const CarouselContainer = styled(View)<CarouselProps>`
  display: flex;
  width: 100%;
  margin: 10px auto;
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : 'null'};
`;
export const CarouselWrapper = styled(View)``;
export const ImageWrapper = styled(View)`
  object-fit: contain;
  layout: fill;
`;

export const CircleContainer = styled(View)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: -20px;
`;

export const CircleWrapper = styled(TouchableOpacity)``;
