import {View} from 'react-native';
import styled from 'styled-components';

const Container = styled(View)`
  width: 100%;
`;

const Header = styled(View)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;
const Body = styled(View)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Footer = styled(View)`
  width: 100%;
`;

const Content = styled(View)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const ConfirmBox = {Container, Header, Body, Footer, Content};

export default ConfirmBox;
