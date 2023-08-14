import {createAsyncThunk} from '@reduxjs/toolkit';
import apiCall, {ApiError, ApiParams} from 'api';
import {user} from 'api/endpoint';
import {
  RegisterResponse,
  UserLoginValue,
  UserRegisterDetails,
  UserResponse,
} from 'common/types';

export const userLogin = createAsyncThunk<
  UserResponse | ApiError,
  UserLoginValue
>('user/login', async (value: UserLoginValue, {rejectWithValue}) => {
  try {
    const params: ApiParams = {
      endpoint: user.login,
      data: {
        email: value.email,
        password: value.password,
      },
    };
    return await apiCall<UserResponse>(params);
  } catch (error: Error | unknown) {
    throw <ApiError>(<unknown>(error as Error).message);
  }
});

export const userRegister = createAsyncThunk<
  RegisterResponse | ApiError,
  UserRegisterDetails
>('user/register', async (values: UserRegisterDetails) => {
  try {
    const params: ApiParams = {
      endpoint: user.register,
      data: values,
    };
    return await apiCall<RegisterResponse>(params);
  } catch (error: Error | unknown) {
    throw <ApiError>(<unknown>(error as Error).message);
  }
});
