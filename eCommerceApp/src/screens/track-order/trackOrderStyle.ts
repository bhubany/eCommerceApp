import {COLORS} from 'common/enums';
import {TextInput, View} from 'react-native';
import {Text} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import styled from 'styled-components';

export const TrackOrderContainer = styled(View)``;
export const TrackOrderFormWrapper = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 100%;
  gap: 10px;
`;

export const TitleTextWrapper = styled(Text)`
  margin-top: 10px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: ${COLORS.BLACK};
`;

export const InputWrapper = styled(TextInput)`
  border: solid ${COLORS.GREY} 1px;
  border-radius: 6px;
  height: 35px;
  width: 90%;
  padding-left: 20px;
`;

export const OrderLoaderWrapper = styled(View)`
  margin-top: 100px;
  padding: 30px;
  width: 100%;
  display: flex;
`;

export const OrderWrapper = styled(View)`
  width: 100%;
`;

export const ProductDetailsContainer = styled(ScrollView)`
  gap: 10px;
  display: flex;
  flex-direction: row;
  background-color: ${COLORS.WHITE};
  padding: 10px;
  border-radius: 10px;
`;

export const OrderDetailsContainer = styled(View)``;

export const NoOrderFoundWrapper = styled(View)`
  padding: 20px;
  text-align: center;
`;

export const NoOrderFoundTextWrapper = styled(Text)`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: ${COLORS.ERROR};
`;

export const PmntWrapper = styled(View)`
  padding: 10px 20px;
  gap: 10px;
`;

export const ShipmentWrapper = styled(View)`
  padding: 10px 20px;
`;

export const ShipmentTitleWrapper = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 20px;
`;
