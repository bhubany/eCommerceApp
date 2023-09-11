import {View} from 'react-native';
import styled from 'styled-components';

const Container = styled(View)`
  margin: 0px !important;
  padding: 0px !important;
  width: 100%;
  height: 100%;
`;

const Wrapper = styled(View)`
  width: 100%;
  display: flex;
  align-items: center;
`;

const Header = styled(View)``;

const Body = styled(View)``;

const Footer = styled(View)`
  height: 100%;
  margin-bottom: auto;
`;

const Styles = {Container, Wrapper, Header, Body, Footer};

export default Styles;
