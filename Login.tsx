import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      alert("Login Successful!");

      navigate("/dashboard");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-[#111827] border border-gray-800 rounded-3xl p-8">

        <div className="flex justify-center mb-6">
          <ShieldCheck size={50} className="text-violet-500" />
        </div>

        <h1 className="text-3xl font-bold text-center text-white">
          Welcome Back
        </h1>

        <p className="text-gray-400 text-center mt-2">
          Login to JobShield AI
        </p>

        <div className="mt-8 space-y-5">

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded-xl bg-[#1F2937] text-white border border-gray-700 outline-none focus:border-violet-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 rounded-xl bg-[#1F2937] text-white border border-gray-700 outline-none focus:border-violet-500"
          />

          <button
            onClick={login}
            className="w-full bg-violet-600 hover:bg-violet-700 transition p-4 rounded-xl font-semibold text-white"
          >
            Sign In
          </button>

        </div>

        <p className="text-gray-400 text-center mt-6">
          Don't have an account?
          <Link
            to="/register"
            className="text-violet-400 ml-2 hover:underline"
          >
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;