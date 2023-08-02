import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loginState} from 'store/selectors';
import {userLogin} from 'store/actions';
import {AnyAction} from 'redux';
import {UserDetails, UserLoginValue} from 'common/types';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {RootState} from 'store';
import {
  SigninContainer,
  SigninWrapper,
  InputWrapper,
  ErrorText,
  InputContainer,
  LabelTextWrapper,
  ButtonWrapper,
  FooterTextWrapper,
  FooterText,
} from './signinStyle';
import Layout from 'layout';
import MyButton from '../../componennts/Buttons';
import {Formik} from 'formik';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {COLORS, STATUS} from 'common/enums';
import {signInSchema} from 'common/validation/userValidation';
import {errorToast, infoToast, successToast} from 'common/utils';

const SignIn: React.FC<DrawerContentComponentProps> = props => {
  const {navigation} = props;
  const login: UserDetails = useSelector(loginState);
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();

  const loginInitialValues: UserLoginValue = {
    email: '',
    password: '',
  };

  const handleSignin = (values: UserLoginValue) => {
    dispatch(userLogin(values));
  };

  const handleForgetPassword = () => {
    infoToast('Password reset');
  };
  const handleSignup = () => {
    navigation.navigate('homeScreen');
  };

  useEffect(() => {
    if (login.status === STATUS.SUCCESS) {
      successToast(login.message);
    } else if (login.status === STATUS.FAILED) {
      errorToast(login.message);
    }
  }, [login]);

  return (
    <Layout>
      <SigninContainer>
        <Formik
          initialValues={loginInitialValues}
          // validationSchema={signInSchema}
          onSubmit={handleSignin}>
          {({handleChange, handleBlur, handleSubmit, values, errors}) => (
            <SigninWrapper>
              <InputContainer>
                <LabelTextWrapper>Email:</LabelTextWrapper>
                <InputWrapper
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  placeholder="user@infinityshop.com"
                />
              </InputContainer>
              {errors.email && <ErrorText>{errors.email}</ErrorText>}

              <InputContainer>
                <LabelTextWrapper>Password:</LabelTextWrapper>
                <InputWrapper
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  placeholder="Enter Your Password"
                  secureTextEntry
                />
                {errors.password && <ErrorText>{errors.password}</ErrorText>}
              </InputContainer>
              <InputContainer>
                <ButtonWrapper errors={errors}>
                  <MyButton
                    width="200px"
                    title="SignIn"
                    color={COLORS.WHITE}
                    handleClick={handleSubmit}
                  />
                </ButtonWrapper>
                {login && login.status === STATUS.FAILED && (
                  <ErrorText>{login.message}</ErrorText>
                )}
              </InputContainer>
              <InputContainer>
                <FooterTextWrapper>
                  <TouchableOpacity onPress={() => handleForgetPassword()}>
                    <FooterText>Forget password?</FooterText>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleSignup}>
                    <FooterText>Sign Up</FooterText>
                  </TouchableOpacity>
                </FooterTextWrapper>
              </InputContainer>
            </SigninWrapper>
          )}
        </Formik>
      </SigninContainer>
    </Layout>
  );
};

export default SignIn;
