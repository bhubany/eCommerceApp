import {COLORS} from 'common/enums';
import {Text, TextInput, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styled from 'styled-components';

interface ShowHideImage {
  show?: boolean;
}

export const ProductDetContainer = styled(View)`
  width: 100%;
`;

export const ContentWrapper = styled(View)`
  width: 100%;
  height: 100%;
`;

export const ImageContainer = styled(View)``;

export const ImageWrapper = styled(View)<ShowHideImage>`
  object-fit: contain;
  display: ${props => (props.show ? 'flex' : 'none')};
`;

export const NextBtnWrapper = styled(View)`
  position: absolute;
  right: 20px;
  bottom: 0px;
  bottom: 5px;
  border: solid ${COLORS.PRIMARY} 1px;
`;
export const PreviousBtnWrapper = styled(View)`
  position: absolute;
  bottom: 0px;
  left: 20px;
  bottom: 5px;
  border: solid ${COLORS.PRIMARY} 1px;
`;

export const QuantityWrapper = styled(View)`
  width: 100%;
  padding: 0px 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  align-items: center;
  height: 40px;
  margin: 10px;
`;

export const QuantityBtnWrapper = styled(TouchableOpacity)<{color?: string}>`
  border: solid ${props => (props.color ? props.color : COLORS.RED)} 1px;
`;

export const QuantityInput = styled(TextInput)`
  background-color: ${COLORS.WHITE};
  font-size: 24px;
  font-weight: 900;
  height: 40px;
  padding: 0 10px !important;
  width: 40%;
  border: solid ${COLORS.GREY} 1px;
  border-radius: 10px;
`;

export const ProductDetailContainer = styled(View)`
  height: 245px;
  margin: 10px;
  border-radius: 20px;
  background-color: ${COLORS.WHITE};
`;

export const ProductDetailWrapper = styled(View)`
  display: flex;
  gap: 15px;
  padding: 10px 30px;
`;

export const FooterWrapper = styled(View)`
  background-color: ${COLORS.LIGHT_GREY};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 10px;
`;

export const LoaderWrapper = styled(View)`
  width: 100%;
  height: 95%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MyCartWrapper = styled(View)``;

export const MyCartLabelWrapper = styled(Text)`
  position: absolute;
  background-color: ${COLORS.WHITE};
  color: ${COLORS.PRIMARY};
  font-weight: 800;
  padding: 3px;
  border-radius: 40px;
  top: -4px;
  right: -3px;
`;
