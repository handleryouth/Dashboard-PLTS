import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Seo } from "components";
import { requestHelper, setCookie, setLocalStorage } from "utils";
import { SetTokenFunctionProps } from "types";

export default function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSetTokenCookies = useCallback(
    ({ accessToken, refreshToken, email }: SetTokenFunctionProps) => {
      setCookie({
        cookieKey: "accessToken",
        cookieValue: accessToken,
        cookieOptions: {
          path: "/",
        },
      });

      setCookie({
        cookieKey: "refreshToken",
        cookieValue: refreshToken,
        cookieOptions: {
          path: "/",
        },
      });

      setLocalStorage("email", email);
    },
    []
  );

  const sendLoginData = useCallback(async () => {
    const response = await requestHelper("plts_auth_login", {
      body: {
        email,
        password,
      },
      withCredentials: false,
    });

    if (response && response.status === 200) {
      handleSetTokenCookies({
        accessToken: response.data!.accessToken,
        refreshToken: response.data!.refreshToken,
        email: response.data!.email,
      });
      navigate("/");
    }
  }, [email, handleSetTokenCookies, navigate, password]);

  return (
    <>
      <Seo title="Login Page" description="Login page for PLTS Dashboard" />

      <div className="flex items-center gap-[172px] overflow-hidden min-h-screen  p-6">
        <div className="flex justify-end basis-1/2">
          <div className="w-9/12">
            <div className="flex items-center">
              <img
                src="/elektro-logo.png"
                alt="elektro-logo"
                className="w-[50px] h-[50px] my-0"
              />
              <h1 className="mb-0 ml-4">PLTS Dashboard</h1>
            </div>
            <p>Please fill your detail to access your account</p>

            <div className="flex flex-col gap-y-8">
              <Input
                label="Email"
                inputClassName="w-full"
                onChange={(value) => setEmail(value)}
              />
              <Input
                label="Password"
                inputClassName="w-full"
                onChange={(value) => setPassword(value)}
              />
              <Button
                className="text-white bg-blue-500"
                onClick={sendLoginData}
              >
                Sign in
              </Button>
            </div>

            <p className="text-center">
              Didn't have an account? Sign up{" "}
              <Link className="text-blue-500" to="/signup">
                here
              </Link>
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl basis-1/2">
          <img
            src="/solarpanel-700.jpg"
            alt="login-welcome"
            className="my-0 w-[650px] h-[615px]"
          />
        </div>
      </div>
    </>
  );
}
