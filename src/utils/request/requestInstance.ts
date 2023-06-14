import axios from "axios";
import { showModal, store } from "utils";
import { StaffDataProps } from "types";
import { getCookie, setCookie } from "../cookie";

export const requestInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true,
});

requestInstance.interceptors.request.use(
  (config) => {
    config.withCredentials = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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
      const { email } = getCookie("staffData") as StaffDataProps;

      return axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}api/login/refresh`,
          {
            email,
          },
          {
            withCredentials: true,
          }
        )
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
                type: "logout",
              })
            );
          }
          return;
        });
    } else if (error.response.status === 500) {
      store.dispatch(
        showModal({
          message: "Something went wrong. Please try again later.",
          title: "Internal Server Error",
        })
      );
      return;
    }

    return error;
  }
);

export default requestInstance;
