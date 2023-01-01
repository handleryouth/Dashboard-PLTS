import axios from "axios";
import { getCookie, setCookie } from "../cookie";
import { getLocalStorage } from "../localStorage";

export const requestHelper = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

export const loginHelper = axios.create({
  baseURL: "http://localhost:8080",
});

requestHelper.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      originalRequest.url === "http://localhost:8080/api/login/refresh"
    ) {
      return Promise.reject(error);
    } else if (error.response.status === 401) {
      const refreshToken = getCookie("refreshToken");
      const email = getLocalStorage("email");

      return axios
        .post("http://localhost:8080/api/login/refresh", {
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

            return requestHelper(originalRequest);
          }
        });
    }
  }
);

export default requestHelper;
