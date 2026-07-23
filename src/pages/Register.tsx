import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      alert("Account Created Successfully!");

      navigate("/dashboard");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-[#111827] rounded-3xl border border-gray-800 p-8">

        <div className="flex justify-center mb-6">
          <ShieldCheck size={50} className="text-violet-500" />
        </div>

        <h1 className="text-3xl text-white font-bold text-center">
          Create Account
        </h1>

        <div className="space-y-4 mt-8">

          <input
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 rounded-xl bg-[#1F2937] text-white border border-gray-700"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded-xl bg-[#1F2937] text-white border border-gray-700"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 rounded-xl bg-[#1F2937] text-white border border-gray-700"
          />

          <button
            onClick={register}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white py-4 rounded-xl font-semibold"
          >
            Create Account
          </button>

        </div>

      </div>

    </div>
  );
}

export default Register;