import { Image } from "primereact/image";
import { Button, Input } from "components";

export default function SignUp() {
  return (
    <div className="flex items-center gap-[172px]">
      <div>
        <div>
          <h1>Create Account</h1>
          <p>Please fill your detail to access your account</p>
        </div>
        <Input label="Full name" />
        <Input label="Email" />
        <Input label="Password" />

        <Button className="bg-blue-500 text-white w-full mt-4">Sign in</Button>
      </div>

      <Image src="/solarpanel.png" alt="login-welcome" />
    </div>
  );
}
