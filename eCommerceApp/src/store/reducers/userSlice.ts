import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, Reducer, AnyAction} from '@reduxjs/toolkit';
import {STATUS} from 'common/enums';
import {UNKNOWN_ERROR_OCCURED} from 'common/messages/error.message';
import {UserDetails, RegisterDetails} from 'common/types';
import {userLogin, userRegister} from 'store/actions';

const initialStateLogin: UserDetails = {
  userId: '',
  firstname: '',
  middlename: '',
  lastname: '',
  address: '',
  email: '',
  isLogined: false,
  role: null,
  imageurl: '',
  imagealttext: '',
  message: '',
  createdat: '',
  updatedat: '',
  updatedby: '',
  status: STATUS.PENDING,
};

const initialStateRegister: RegisterDetails = {
  status: STATUS.PENDING,
  isRegistered: false,
  message: '',
};

const userSlice = createSlice({
  name: 'userReducer',
  initialState: {
    login: initialStateLogin,
    register: initialStateRegister,
  },
  reducers: {
    userLogout(state) {
      state.login = initialStateLogin;
      AsyncStorage.removeItem('persist:login');
    },
    cleanUserStatus(state) {
      state.login = {
        ...state.login,
        status: STATUS.PENDING,
        message: '',
      };
      state.register = {
        ...state.register,
        status: STATUS.PENDING,
        message: '',
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(userLogin.pending, (state, action) => {
        state.login = {
          ...initialStateLogin,
          status: STATUS.LOADING,
        };
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.login = {
          ...state.login,
          ...action.payload,
          status: STATUS.SUCCESS,
          message: 'Login Sucessful!',
          isLogined: true,
        };
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.login = {
          ...initialStateLogin,
          status: STATUS.FAILED,
          message: action.error.message || UNKNOWN_ERROR_OCCURED,
        };
      })
      .addCase(userRegister.pending, (state, action) => {
        state.register = {
          ...initialStateRegister,
          status: STATUS.PENDING,
        };
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        console.log(action);
        state.register = {
          ...state.register,
          status: STATUS.SUCCESS,
          isRegistered: true,
          message: action.payload,
        };
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.register = {
          ...state.register,
          status: STATUS.FAILED,
          message: action.error.message || UNKNOWN_ERROR_OCCURED,
        };
      });
  },
});

const userReducer = userSlice.reducer;
export default userReducer;
export type UserReducerType = Reducer<UserDetails, AnyAction>;
export type UserReducerStateType = ReturnType<typeof userReducer>;
export const {userLogout, cleanUserStatus} = userSlice.actions;
