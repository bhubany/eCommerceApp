export interface UserDetails
  extends Omit<Omit<UserResponse, 'id'>, 'password'> {
  userId: string;
  isLogined: boolean;
  isLoading: boolean;
  isError: boolean;
}

export type UserResponse = {
  id: string;
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
  district: string;
  city: string;
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

export interface RegisterDetails {
  isLoading: boolean;
  isError: boolean;
  message: string;
  isRegistered: boolean;
}

export interface UserRegisterDetails {
  firstName: string;
  middleName: string;
  lastName: string;
  address: Address;
  email: string;
  password: string;
}
