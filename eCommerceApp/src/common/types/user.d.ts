import {STATUS} from 'common/enums';

export interface UserDetails extends Omit<UserResponse, 'password'> {
  isLogined: boolean;
  status: STATUS;
}

export type UserResponse = {
  id?: string;
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  address: string;
  role: string | null;
  imageurl: string;
  imagealttext: string;
  password?: null | '';
  updatedby: string;
  createdat: string;
  updatedat: string;
  message: string;
};

export interface Address {
  country: string;
  province: string;
  district?: string;
  city: string;
  ward: string;
  tole: string;
  houseNo: string;
}

export interface UserLoginValue {
  userId?: string | null;
  email: string;
  password: string;
}

export interface ReducerAction {
  type: string;
  payload: object;
}

export interface RegisterResponse {
  message: string;
}
export interface RegisterDetails {
  status: STATUS;
  message: string;
  isRegistered: boolean;
}

export interface UserRegisterDetails {
  firstName: string;
  middleName: string;
  lastName: string;
  address: string;
  email: string;
  password: string;
}
