import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button, Input, Password, Seo } from "components";
import { loginHelper } from "utils";

export default function SignUp() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");

  const sendSignupData = useCallback(async () => {
    const response = await loginHelper("/api/login/create", {
      data: {
        email,
        password,
        name: fullName,
      },
      method: "POST",
    });
    return response;
  }, [email, fullName, password]);

  return (
    <>
      <Seo title="Signup Page" description="Sign up for PLTS Dashboard" />
      <div className="flex items-center gap-[172px] overflow-hidden min-h-screen  p-6">
        <div className="flex justify-end basis-1/2">
          <div className="w-9/12">
            <div>
              <h1>Create Account</h1>
            </div>
            <div className="flex flex-col gap-y-5">
              <Input
                label="Full name"
                inputClassName="w-full"
                onChange={(value) => setFullName(value)}
              />

              <Input
                label="Email"
                inputClassName="w-full"
                onChange={(value) => setEmail(value)}
              />

              <Password onChange={(e) => setPassword(e.target.value)} />
              <Button
                className="text-white bg-blue-500"
                onClick={sendSignupData}
              >
                Sign up
              </Button>
            </div>

            <p className="text-center">
              Have an account? Sign in{" "}
              <Link className="text-blue-500" to="/login">
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