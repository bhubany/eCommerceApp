import {COLORS} from 'common/enums';
import {Text, TextInput, View} from 'react-native';
import styled from 'styled-components';

export const SigninContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
`;

export const SigninWrapper = styled(View)`
  margin-top: 18%; //! try something different to align vertically center
  width: 80%;
  height: 340px;
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

export const InputWrapper = styled(TextInput)`
  border: solid ${COLORS.BLACK} 1px;
  border-radius: 10px;
  height: 35px;
  text-align: center;
  padding: 0;
`;

export const LabelTextWrapper = styled(Text)`
  color: ${COLORS.BLACK};
  margin-bottom: 10px;
`;

export const ErrorText = styled(Text)`
  color: ${COLORS.ERROR};
  margin-left: 10px;
  padding: 5px;
`;

export const ButtonWrapper = styled(View)<{errors?: object}>`
  display: ${props =>
    props.errors && (Object.values(props.errors).length ? 'none' : 'flex')};
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

export const FooterTextWrapper = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const FooterText = styled(Text)`
  color: ${COLORS.BLACK};
`;
