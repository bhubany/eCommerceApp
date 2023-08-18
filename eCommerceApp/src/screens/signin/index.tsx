import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {COLORS, STATUS} from 'common/enums';
import {UserDetails, UserLoginValue} from 'common/types';
import {errorToast, infoToast, successToast} from 'common/utils';
import {signInSchema} from 'common/validation/userValidation';
import {ErrorMessage, Formik, FormikHelpers} from 'formik';
import Layout from 'layout';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {AnyAction} from 'redux';
import {RootState} from 'store';
import {userLogin} from 'store/actions';
import {cleanUserStatus} from 'store/reducers/userSlice';
import {loginState} from 'store/selectors';
import MyButton from '../../componennts/Buttons';
import {
  ButtonWrapper,
  ErrorText,
  FooterText,
  FooterTextWrapper,
  InputContainer,
  InputWrapper,
  LabelTextWrapper,
  SigninContainer,
  SigninWrapper,
} from './signinStyle';

const SignIn: React.FC<DrawerContentComponentProps> = props => {
  const {navigation} = props;
  const login: UserDetails = useSelector(loginState);
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const [responseErrMessage, setresponseErrMessage] = useState<string | null>(
    null,
  );

  const loginInitialValues: UserLoginValue = {
    email: '',
    password: '',
  };

  const handleSignin = (
    values: UserLoginValue,
    {resetForm, setErrors}: FormikHelpers<UserLoginValue>,
  ) => {
    setresponseErrMessage(null);
    dispatch(userLogin(values));
    resetForm();
    setErrors({});
  };

  const handleForgetPassword = () => {
    infoToast('Password reset');
  };
  const handleSignup = () => {
    navigation.navigate('signup');
  };

  useEffect(() => {
    if (login.status === STATUS.SUCCESS) {
      successToast(login.message);
      navigation.navigate('profile');
    } else if (login.status === STATUS.FAILED) {
      errorToast(login.message);
      setresponseErrMessage(login.message);
    }
    if (login.status !== STATUS.PENDING) {
      dispatch(cleanUserStatus());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [login]);

  return (
    <Layout>
      <SigninContainer>
        <Formik
          initialValues={loginInitialValues}
          validationSchema={signInSchema}
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
              <ErrorMessage name="email">
                {message => <ErrorText>{message}</ErrorText>}
              </ErrorMessage>

              <InputContainer>
                <LabelTextWrapper>Password:</LabelTextWrapper>
                <InputWrapper
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  placeholder="Enter Your Password"
                  secureTextEntry
                />
                <ErrorMessage name="password">
                  {message => <ErrorText>{message}</ErrorText>}
                </ErrorMessage>
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
                {responseErrMessage && (
                  <ErrorText>{responseErrMessage}</ErrorText>
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
