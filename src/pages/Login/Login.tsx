import { Image } from "primereact/image";
import { Input } from "components";

export default function Login() {
  return (
    <div className="flex items-center gap-[172px]">
      <div>
        <div>
          <h1>PLTS Dashboard</h1>
          <p>Please fill your detail to access your account</p>
        </div>
        <Input label="Email" />
        <Input label="Password" />
      </div>

      <Image src="/solarpanel.png" alt="login-welcome" />
    </div>
  );
}
