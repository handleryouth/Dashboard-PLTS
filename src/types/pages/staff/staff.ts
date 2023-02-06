import { AuthResponse } from "../login";

export interface StaffDataProps {
  _id: string;
  createdAt: string;
  email: string;
  role: string;
  status: string;
  name: string;
  password?: AuthResponse;
}

export interface StaffDataResponse {
  data: StaffDataProps[];
  total: number;
}

export interface StaffRequestParams {
  limit: number;
  page: number;
}

export interface ActivateStaffBodyProps {
  id: string;
}

export interface DeactivateStaffBodyProps {
  id: string;
}

export interface EditStaffBodyProps {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
}
