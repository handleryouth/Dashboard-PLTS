import { requestHelper } from "../../utils";

export interface LogoutProps {
  onLogoutSuccess: () => void;
  onLogoutFailure: () => void;
}

export async function logout({
  onLogoutFailure,
  onLogoutSuccess,
}: LogoutProps) {
  const response = await requestHelper("plts_auth_logout");

  if (response.status === 200) {
    onLogoutSuccess();
  } else {
    onLogoutFailure();
  }
}
