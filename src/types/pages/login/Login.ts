export interface SetTokenFunctionProps {
  accessToken: string;
  refreshToken: string;
  email: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  email: string;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}
