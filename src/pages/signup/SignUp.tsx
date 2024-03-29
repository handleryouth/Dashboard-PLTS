import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { Button, Input, NotificationModal, Password, Seo } from "components";
import { requestHelper } from "utils";
import { SignupParams } from "types";

export interface SignUpProps {
  visible: boolean;
  message: string;
}

export const SIGN_UP_MODAL_INITIAL_STATES: SignUpProps = {
  message: "",
  visible: false,
};

export default function SignUp() {
  const { control, handleSubmit, setError } = useForm<SignupParams>();

  const [showModal, setShowModal] = useState(SIGN_UP_MODAL_INITIAL_STATES);

  const navigate = useNavigate();

  const sendSignupData = useCallback(
    async (data: SignupParams) => {
      const response = await requestHelper("post_signup_data", {
        body: data,
      });

      if (response.status === 201) {
        navigate("/login");
      } else if (response.response?.status === 409) {
        setShowModal({
          message: response.response.data.message,
          visible: true,
        });

        setError("email", {
          message: response.response.data.message,
        });
      }
    },
    [navigate, setError]
  );

  return (
    <>
      <NotificationModal
        message={showModal.message}
        visible={showModal.visible}
        onButtonClicked={() => setShowModal(SIGN_UP_MODAL_INITIAL_STATES)}
      />
      <Seo title="Signup Page" description="Sign up for PLTS Dashboard" />
      <div className="flex items-center gap-[172px] overflow-hidden min-h-screen  p-6">
        <div className="flex w-full mediumDisplay:w-auto mediumDisplay:justify-end mediumDisplay:basis-1/2">
          <div className="w-full mediumDisplay:w-9/12">
            <h1>Create Account</h1>

            <form
              className="flex flex-col gap-y-5"
              onSubmit={handleSubmit(sendSignupData)}
            >
              <Controller
                control={control}
                name="name"
                render={({ field, fieldState }) => (
                  <Input
                    id={field.name}
                    {...field}
                    label="Full name"
                    errorMessage={fieldState.error?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="email"
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
                render={({ field, fieldState }) => (
                  <Password
                    id={field.name}
                    {...field}
                    errorMessage={fieldState.error?.message}
                  />
                )}
              />

              <Button className="text-white bg-blue-500" type="submit">
                Sign up
              </Button>
            </form>

            <p className="text-center">
              Have an account? Sign in{" "}
              <Link className="text-blue-500" to="/login">
                here
              </Link>
            </p>
          </div>
        </div>

        <div className="hidden mediumDisplay:block overflow-hidden rounded-xl mediumDisplay:basis-1/2">
          <img
            src="/solarpanel-700.jpg"
            alt="login-welcome"
            className="my-0 aspect-4/3 w-full"
          />
        </div>
      </div>
    </>
  );
}
