import axios from "axios";
import { showModal, store } from "utils";
import { StaffDataProps } from "types";
import { getCookie, setCookie } from "../cookie";

export const requestInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true,
});

requestInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      originalRequest.url !== `/api/login/`
    ) {
      const refreshToken = getCookie("refreshToken");

      const { email } = getCookie("staffData") as StaffDataProps;

      return axios
        .post(`${process.env.REACT_APP_SERVER_URL}api/login/refresh`, {
          refreshToken,
          email,
        })
        .then((res) => {
          if (res.status === 201) {
            setCookie({
              cookieKey: "accessToken",
              cookieValue: res.data.accessToken,
              cookieOptions: {
                path: "/",
              },
            });

            return requestInstance(originalRequest);
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            store.dispatch(
              showModal({
                message: "Your session has expired. Please login again.",
                title: "Session Expired",
              })
            );
          }
        });
    } else if (error.response.status === 500) {
      store.dispatch(
        showModal({
          message: "Something went wrong. Please try again later.",
          title: "Internal Server Error",
        })
      );
    }

    return error;
  }
);

export default requestInstance;
