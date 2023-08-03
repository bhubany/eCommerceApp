import React, {useEffect, useState} from 'react';
import Layout from 'layout';
import {
  SignupContainer,
  SignupWrapper,
  InputContainer,
  InputWrapper,
  LabelTextWrapper,
  ErrorText,
  ButtonWrapper,
  FooterTextWrapper,
  FooterText,
  SubInputContainer,
  SubInputContainerContent,
} from './signupStyle';
import {Formik, FormikHelpers} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {registerState} from 'store/selectors';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {RootState} from 'store';
import {RegisterDetails, UserRegisterDetails} from 'common/types';
import {userRegister} from 'store/actions';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {COLORS, STATUS} from 'common/enums';
import {errorToast, infoToast, successToast} from 'common/utils';
import {registerSchema} from 'common/validation/userValidation';
import MyButton from '../../componennts/Buttons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MyCheckbox from '../../componennts/Checkbox';
import {cleanUserStatus} from 'store/reducers/userSlice';

const SignUp: React.FC<DrawerContentComponentProps> = props => {
  const {navigation} = props;
  const register: RegisterDetails = useSelector(registerState);
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const [checked, setChecked] = useState(false);

  interface NewRegisterDetails extends UserRegisterDetails {
    confPassword: string;
  }
  const registerInitialValues: NewRegisterDetails = {
    firstName: '',
    middleName: '',
    lastName: '',
    address: '',
    email: '',
    password: '',
    confPassword: '',
  };

  const handleSignin = () => {
    navigation.navigate('signin');
  };

  const handleSignup = (
    newValues: NewRegisterDetails,
    {resetForm, setErrors}: FormikHelpers<NewRegisterDetails>,
  ) => {
    const {confPassword, ...values} = newValues;
    dispatch(userRegister(values));
    resetForm();
    setErrors({});
  };

  useEffect(() => {
    if (register.status === STATUS.SUCCESS) {
      successToast(register.message);
      handleSignin();
    } else if (register.status === STATUS.FAILED) {
      errorToast(register.message);
    }
    if (register.status !== STATUS.PENDING) {
      dispatch(cleanUserStatus());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [register]);
  return (
    <Layout>
      <SignupContainer>
        <Formik
          initialValues={registerInitialValues}
          validationSchema={registerSchema}
          onSubmit={handleSignup}>
          {({handleChange, handleBlur, handleSubmit, values, errors}) => (
            <SignupWrapper>
              <InputContainer>
                <SubInputContainer>
                  <SubInputContainerContent>
                    <LabelTextWrapper>First Name:</LabelTextWrapper>
                    <InputWrapper
                      onChangeText={handleChange('firstName')}
                      onBlur={handleBlur('firstName')}
                      value={values.firstName}
                      placeholder="First name"
                    />
                    {errors.firstName && (
                      <ErrorText>{errors.firstName}</ErrorText>
                    )}
                  </SubInputContainerContent>
                  <SubInputContainerContent>
                    <LabelTextWrapper>Middle Name:</LabelTextWrapper>
                    <InputWrapper
                      onChangeText={handleChange('middleName')}
                      onBlur={handleBlur('middleName')}
                      value={values.middleName}
                      placeholder="Middle name"
                    />
                    {errors.middleName && (
                      <ErrorText>{errors.middleName}</ErrorText>
                    )}
                  </SubInputContainerContent>
                  <SubInputContainerContent>
                    <LabelTextWrapper>Last Name:</LabelTextWrapper>
                    <InputWrapper
                      onChangeText={handleChange('lastName')}
                      onBlur={handleBlur('lastName')}
                      value={values.lastName}
                      placeholder="Last name"
                    />
                    {errors.lastName && (
                      <ErrorText>{errors.lastName}</ErrorText>
                    )}
                  </SubInputContainerContent>
                </SubInputContainer>
              </InputContainer>

              <InputContainer>
                <LabelTextWrapper>Full Address:</LabelTextWrapper>
                <InputWrapper
                  onChangeText={handleChange('address')}
                  onBlur={handleBlur('address')}
                  value={values.address}
                  placeholder="Enter Your Full Address"
                />
                {errors.address && <ErrorText>{errors.address}</ErrorText>}
              </InputContainer>
              <InputContainer>
                <LabelTextWrapper>Email:</LabelTextWrapper>
                <InputWrapper
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  placeholder="user@infinityshop.com"
                />
                {errors.email && <ErrorText>{errors.email}</ErrorText>}
              </InputContainer>
              <InputContainer>
                <SubInputContainer>
                  <SubInputContainerContent>
                    <LabelTextWrapper>Password:</LabelTextWrapper>
                    <InputWrapper
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      placeholder="Password"
                      secureTextEntry
                    />
                    {errors.password && (
                      <ErrorText>{errors.password}</ErrorText>
                    )}
                  </SubInputContainerContent>
                  <SubInputContainerContent>
                    <LabelTextWrapper>Confirm Password:</LabelTextWrapper>
                    <InputWrapper
                      onChangeText={handleChange('confPassword')}
                      onBlur={handleBlur('confPassword')}
                      value={values.confPassword}
                      placeholder="Confirm Password"
                      secureTextEntry
                    />
                    {errors.confPassword && (
                      <ErrorText>{errors.confPassword}</ErrorText>
                    )}
                  </SubInputContainerContent>
                </SubInputContainer>
              </InputContainer>
              <InputContainer>
                <MyCheckbox
                  text="Agree to our terms and conditions"
                  checked={checked}
                  setIsChecked={setChecked}
                  borderColor={checked ? COLORS.SUCCESS : COLORS.ERROR}
                  textColor={checked ? COLORS.SUCCESS : COLORS.ERROR}
                />
              </InputContainer>
              <InputContainer>
                <ButtonWrapper errors={errors} checked={checked}>
                  <MyButton
                    width="200px"
                    title="SignUp"
                    color={COLORS.WHITE}
                    handleClick={handleSubmit}
                  />
                </ButtonWrapper>
                {register && register.status === STATUS.FAILED && (
                  <ErrorText>{register.message}</ErrorText>
                )}
              </InputContainer>
              <InputContainer>
                <FooterTextWrapper>
                  <TouchableOpacity onPress={handleSignin}>
                    <FooterText>Already have account Sign In</FooterText>
                  </TouchableOpacity>
                </FooterTextWrapper>
              </InputContainer>
            </SignupWrapper>
          )}
        </Formik>
      </SignupContainer>
    </Layout>
  );
};

export default SignUp;
