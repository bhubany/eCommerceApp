import {createAsyncThunk} from '@reduxjs/toolkit';
import apiCall, {ApiError, ApiParams} from 'api';
import {user} from 'api/endpoint';
import {UserLoginValue, UserRegisterDetails, UserResponse} from 'common/types';

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
    throw <ApiError>(error as Error).message;
  }
});

export const userRegister = createAsyncThunk(
  'user/register',
  async (value: UserRegisterDetails) => {
    const params: ApiParams = {
      endpoint: user.register,
      data: {
        email: value.email,
        password: value.password,
      },
    };
    return await apiCall(params);
  },
);
