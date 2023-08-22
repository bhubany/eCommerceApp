import {COLORS} from 'common/enums';
import {TouchableOpacity, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import styled from 'styled-components';

const Container = styled(View)`
  width: 100%;
`;

const Header = styled(View)`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Body = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Input = styled(TextInput)`
  border: solid 1px ${COLORS.INVERSE};
  border-radius: 8px;
  height: 40px;
  font-weight: 900;
  font-size: 20px;
  padding: 0 !important;
  margin: 0 !important;
  width: 150px;
  text-align: center;
`;

const BtnWrapper = styled(TouchableOpacity)<{borderColor?: string}>`
  border: solid 1px
    ${props => (props.borderColor ? props.borderColor : COLORS.LIGHT_GREY)};
  border-radius: 8px;
  height: 40px;
  padding: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Styles = {Container, Header, Body, Input, BtnWrapper};
export default Styles;
