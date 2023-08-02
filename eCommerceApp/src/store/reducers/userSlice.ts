import {createSlice, Reducer, AnyAction} from '@reduxjs/toolkit';
import {STATUS} from 'common/enums';
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
  isError: false,
  isLoading: false,
  isRegistered: false,
  message: '',
};

const userSlice = createSlice({
  name: 'userReducer',
  initialState: {
    login: initialStateLogin,
    register: initialStateRegister,
  },
  reducers: {},
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
          message: action.error.message || 'Unknown error occurred',
        };
      })
      .addCase(userRegister.pending, (state, action) => {
        state.register.isLoading = true;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.register.isLoading = false;
        state.register.isRegistered = true;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.register.isLoading = false;
        state.register.isError = true;
        state.register.message = action.error.message || '';
      });
  },
});

const userReducer = userSlice.reducer;
export default userReducer;
export type UserReducerType = Reducer<UserDetails, AnyAction>;
export type UserReducerStateType = ReturnType<typeof userReducer>;
