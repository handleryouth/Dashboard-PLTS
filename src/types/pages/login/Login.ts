import { StaffDataProps } from "../staff";

export interface SetTokenFunctionProps {
  accessToken: string;
  refreshToken: string;
  email: string;
  staffData: StaffDataProps;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  email: string;
  staffData: StaffDataProps;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface AuthResponse {
  _id: string;
  name: string;
  email: string;
  password: string;
}

export interface LoginFormProps {
  email: string;
  password: string;
}

export interface SignupParams {
  email: string;
  password: string;
  name: string;
}
