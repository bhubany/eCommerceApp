import {COLORS} from 'common/enums';
import {View} from 'react-native';
import styled from 'styled-components';

const Container = styled(View)`
  flex: 1;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`;

const Label = styled(View)`
  margin-bottom: 4px;
  display: flex;
  flex-direction: row;
  gap: 4px;
`;

const OptionWrapper = styled(View)`
  gap: 10px;
`;

const Selector = styled(View)`
  display: flex;
  width: auto;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
`;

const Select = styled(View)`
  height: 20px;
  width: 20px;
  border: solid ${COLORS.GREY} 1px;
  border-radius: 30px;
`;

const Selected = styled(View)`
  background-color: ${COLORS.BLACK};
  height: 12px;
  width: 12px;
  margin: 3px;
  border-radius: 30px;
`;

const Error = styled(View)`
  width: 80%;
  margin: 5px 0;
  margin-left: auto;
`;

const Styles = {
  Container,
  OptionWrapper,
  Label,
  Selector,
  Error,
  Select,
  Selected,
};

export default Styles;
