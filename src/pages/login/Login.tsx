import { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useCookies } from "react-cookie";
import { Button, Input, Seo, Password } from "components";
import { requestHelper, showModal } from "utils";
import { LoginFormProps, SetTokenFunctionProps } from "types";
import { LOGIN_FORM_INITIAL_VALUES } from "const";
import { useDispatch } from "react-redux";

export default function Login() {
  const { control, handleSubmit, setError } = useForm<LoginFormProps>({
    defaultValues: LOGIN_FORM_INITIAL_VALUES,
  });

  const dispatch = useDispatch();

  const [, setCookies] = useCookies([
    "accessToken",
    "refreshToken",
    "staffData",
  ]);

  const navigate = useNavigate();

  const handleSetTokenCookies = useCallback(
    ({ accessToken, refreshToken, staffData }: SetTokenFunctionProps) => {
      setCookies("accessToken", accessToken, {
        path: "/",
      });

      setCookies("refreshToken", refreshToken, {
        path: "/",
      });

      setCookies("staffData", JSON.stringify(staffData), {
        path: "/",
      });

      navigate("/dashboard");
    },
    [navigate, setCookies]
  );

  const sendLoginData = useCallback(
    async ({ email, password }: LoginFormProps) => {
      const response = await requestHelper("plts_auth_login", {
        body: {
          email,
          password,
        },
        withCredentials: false,
      });

      if (response.status === 200) {
        handleSetTokenCookies({
          accessToken: response.data.data.accessToken,
          refreshToken: response.data.data.refreshToken,
          email: response.data.data.email,
          staffData: response.data.data.staffData,
        });
      } else if (response.response?.status === 401) {
        dispatch(
          showModal({
            message: response.response.data.message,
            title: "Login Failed",
          })
        );
        setError("email", {
          message: response.response.data.message,
        });
        setError("password", {
          message: response.response.data.message,
        });
      }
    },
    [dispatch, handleSetTokenCookies, setError]
  );

  const handleSubmitEvent = useCallback(
    (data: LoginFormProps) => {
      sendLoginData(data);
    },
    [sendLoginData]
  );

  return (
    <>
      <Seo title="Login Page" description="Login page for PLTS Dashboard" />

      <div className="flex items-center gap-[172px] overflow-hidden min-h-screen  p-6">
        <div className="flex w-full mediumDisplay:w-auto mediumDisplay:justify-end mediumDisplay:basis-1/2">
          <div className="w-full mediumDisplay:w-9/12">
            <div className="flex items-center">
              <img
                src="/elektro-logo.png"
                alt="elektro-logo"
                className="w-[50px] h-[50px] my-0"
              />
              <h1 className="mb-0 ml-4">PLTS Dashboard</h1>
            </div>
            <p>Please fill your detail to access your account</p>

            <form
              className="flex flex-col gap-y-8"
              onSubmit={handleSubmit(handleSubmitEvent)}
            >
              <Controller
                control={control}
                name="email"
                rules={{
                  required: "Email is required",
                }}
                render={({ field, fieldState }) => (
                  <Input
                    id={field.name}
                    {...field}
                    label="Email"
                    errorMessage={fieldState.error?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                rules={{
                  required: "Password is required",
                }}
                render={({ field, fieldState }) => (
                  <Password
                    id={field.name}
                    {...field}
                    errorMessage={fieldState.error?.message}
                  />
                )}
              />

              <Button className="w-full text-white bg-blue-500" type="submit">
                Sign in
              </Button>
            </form>

            <p className="text-center">
              Didn't have an account? Sign up{" "}
              <Link className="text-blue-500" to="/signup">
                here
              </Link>
            </p>
          </div>
        </div>

        <div className="hidden mediumDisplay:block overflow-hidden rounded-xl mediumDisplay:basis-1/2">
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
