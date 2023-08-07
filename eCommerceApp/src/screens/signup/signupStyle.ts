import {COLORS} from 'common/enums';
import {Text, TextInput, View} from 'react-native';
import styled from 'styled-components';

export const SignupContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px 5px;
`;

export const SignupWrapper = styled(View)`
  width: 100%;
  min-height: 400px;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 16px;
  shadow-color: #000000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 5; //for android devices
  justify-content: center;
`;

export const InputContainer = styled(View)`
  padding: 10px;
`;

export const SubInputContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

export const SubInputContainerContent = styled(View)`
  width: 48%;
`;

export const InputWrapper = styled(TextInput)`
  border: solid ${COLORS.BLACK} 1px;
  border-radius: 6px;
  height: 35px;
  text-align: center;
  padding: 0;
`;

export const LabelTextWrapper = styled(Text)`
  color: ${COLORS.BLACK};
  font-weight: bold;
  margin-bottom: 2px;
`;

export const ErrorText = styled(Text)`
  color: ${COLORS.ERROR};
  margin-left: 10px;
  padding: 5px;
`;

export const ButtonWrapper = styled(View)<{errors?: object; checked: boolean}>`
  display: ${props =>
    (props.errors && Object.values(props.errors).length) || !props.checked
      ? 'none'
      : 'flex'};
  justify-content: center;
  align-items: center;
`;

export const FooterTextWrapper = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;

export const FooterText = styled(Text)`
  color: ${COLORS.BLACK};
  font-size: 16px;
  font-weight: bold;
`;
