/* eslint-disable @next/next/no-img-element */
import { authByPassword } from "actions/auth.action";

const LoginPage: React.FC = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-4">
      <div className="max-w-80 bg-transparent">
        <img src="/logo.png" alt="Logo" />
      </div>
      <form
        action={authByPassword}
        className="flex flex-col gap-2 min-w-72 bg-transparent p-4"
      >
        <div>
          <label htmlFor="username" className="block">
            Login
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="border rounded-md w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="border rounded-md w-full"
            required
          />
        </div>
        <button type="submit" className="border rounded-md mt-2">
          Log in
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
