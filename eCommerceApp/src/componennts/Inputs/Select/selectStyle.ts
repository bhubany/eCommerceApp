import {COLORS} from 'common/enums';
import {TextInput, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components';

const Container = styled(View)`
  display: flex;
  flex-direction: row;
  align-self: center;
`;

const Wrapper = styled(View)`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
`;

const Label = styled(View)`
  width: 80%;
  margin-bottom: 4px;
  display: flex;
  flex-direction: row;
  gap: 4px;
`;

const Selector = styled(TouchableOpacity)`
  border: solid ${COLORS.BLACK} 1px;
  border-radius: 10px;
  width: 80%;
  display: flex;
  flex-direction: row;
  padding: 10px;
  align-items: center;
  justify-content: space-between;
`;

const OptionWrapper = styled(View)`
  height: 300px;
  width: 80%;
  border-radius: 4px;
  elevation: 3;
  margin-top: 54px;
  position: absolute;
  background-color: ${COLORS.WHITE};
  opacity: 1;
  z-index: 1;
`;

const SearchBox = styled(TextInput)`
  border: 1px solid ${COLORS.LIGHT_GREY};
  margin: 5px 10px;
  border-radius: 5px;
  height: 40px;
  padding: 0 10px;
`;

const Option = styled(TouchableOpacity)`
  align-self: center;
  margin: 5px 0;
  width: 85%;
  border-radius: 5px;
  padding: 5px 0;
  border-bottom-width: 0.8px;
  border-bottom-color: ${COLORS.LIGHT_GREY};
`;

const Error = styled(View)`
  width: 80%;
  margin: 5px 0;
  margin-left: auto;
`;

const Styles = {
  Container,
  Wrapper,
  Label,
  Selector,
  OptionWrapper,
  SearchBox,
  Option,
  Error,
};
export default Styles;
