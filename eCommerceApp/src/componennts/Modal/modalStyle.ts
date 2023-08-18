import {COLORS} from 'common/enums';
import {View} from 'react-native';
import styled from 'styled-components';

const Container = styled(View)`
  width: 100%;
  height: 100%;
  background-color: ${COLORS.WHITE};
  opacity: 0.5;
`;
const Wrapper = styled(View)`
  flex: 1;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Content = styled(View)`
  width: 90%;
  background-color: ${COLORS.WHITE};
  border-radius: 8px;
  shadow-color: ${COLORS.BLACK};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 5; //for android devices
  padding: 10px;
`;

const Header = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 20px;
`;

const Body = styled(View)`
  padding: 10px;
  align-items: center;
`;

const Footer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const MyModal = {Container, Wrapper, Content, Header, Body, Footer};
export default MyModal;
