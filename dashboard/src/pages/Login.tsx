import { FormEvent, useState } from "react";
import usePocketbase from "../hooks/usePocketbase";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const { authStore } = usePocketbase();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const pocketbase = usePocketbase();
  const navigate = useNavigate();

  if (authStore.isValid) {
    navigate("/");
  }

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await pocketbase.collection("users").authWithPassword(email, password);
      navigate("/home");
      toast.success("Logged in successfully.");
    } catch (error: any) {
      if (error?.status === 400) {
        toast.error("Invalid email or password.");
      }
    }

    setIsSubmitting(false);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="p-8 flex flex-col gap-4 w-1/2 max-w-96 shadow-black rounded-lg"
        onSubmit={handleLogin}
      >
        <h2 className="text-[5rem] text-transparent bg-clip-text bg-gradient-to-b to-[#636280] from-white text-center font-[800]">
          Log In
        </h2>
        <input
          className="appearance-none px-4 py-2 text-lg bg-transparent ring-1 ring-white/20 rounded-lg"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="appearance-none px-4 py-2 text-lg bg-transparent ring-1 ring-white/20 rounded-lg"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="p-2 bg-slate-600 hover:bg-slate-500 rounded transition-colors">
          {isSubmitting ? "Loading..." : "Login"}
        </button>
        <span className="text-center text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-slate-400 underline hover:no-underline"
          >
            Sign up
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
