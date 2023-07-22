import {RootState} from 'store';
import {UserReducerStateType} from 'store/reducers/userSlice';

export const loginState = (state: RootState & {user: UserReducerStateType}) =>
  state.user.login;
// export const selectUserIsLoading = (state: RootState) => state.user.isLoading;
// export const selectUserError = (state: RootState) => state.user.error;
