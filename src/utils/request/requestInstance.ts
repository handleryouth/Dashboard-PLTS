import axios from "axios";
import { getCookie, setCookie } from "../cookie";
import { getLocalStorage } from "../localStorage";

export const requestInstance = axios.create({
  baseURL: "http://10.3.132.252:8080/",
  withCredentials: true,
});

export const loginInstance = axios.create({
  baseURL: "http://10.3.132.252:8080/",
});

requestInstance.interceptors.response.use(
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

            return requestInstance(originalRequest);
          }
        });
    }
  }
);

export default requestInstance;
