import { FormEvent, useState } from "react";
import usePocketbase from "../hooks/usePocketbase";
import { Link, useNavigate } from "react-router-dom"
import { Toaster, toast } from "sonner";

const Signup = () => {
  const { authStore } = usePocketbase();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const pocketbase = usePocketbase();
  const navigate = useNavigate();

  if (authStore.isValid) {
    navigate("/");
  }

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    } else if (password.length > 72) {
      toast.error("Password must be less than 72 characters long.");
      return;
    } else if (password !== passwordConfirm) {
      toast.error("Passwords do not match.");
      return;
    } else if (!email.includes("@wrdsb.ca")) {
      toast.error("Email must be an @wrdsb.ca email.");
      return;
    }

    setIsSubmitting(true);

    try {
      await pocketbase.collection("users").create({
        name: name,
        email: email,
        password: password,
        passwordConfirm: passwordConfirm,
      });

      navigate("/login");
      toast.success("Account created successfully.");
    } catch (error: any) {
      if (error?.status === 400) {
        toast.error(error.data.data.email.message);
      }
    }

    setIsSubmitting(false);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Toaster richColors theme="dark" />
      <form
        className="p-8 flex flex-col gap-4 w-1/2 max-w-96 shadow-black rounded-lg"
        onSubmit={handleSignup}
      >
        <h2 className="text-[5rem] text-transparent bg-clip-text bg-gradient-to-b to-[#636280] from-white text-center font-[800]">
          Sign Up
        </h2>
        <input
          className="appearance-none px-4 py-2 text-lg bg-transparent ring-1 ring-white/20 rounded-lg"
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <input
          className="appearance-none px-4 py-2 text-lg bg-transparent ring-1 ring-white/20 rounded-lg"
          type="password"
          placeholder="Confirm Password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <button className="p-2 bg-slate-600 hover:bg-slate-500 rounded transition-colors">
          {isSubmitting ? "Loading..." : "Sign Up"}
        </button>
        <span className="text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-slate-400 underline hover:no-underline"
          >
            Log in
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
