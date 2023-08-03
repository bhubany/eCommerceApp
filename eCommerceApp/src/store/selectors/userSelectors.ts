import {RootState} from 'store';
import {UserReducerStateType} from 'store/reducers/userSlice';

export const loginState = (state: RootState & {user: UserReducerStateType}) =>
  state.user.login;
export const registerState = (
  state: RootState & {user: UserReducerStateType},
) => state.user.register;
