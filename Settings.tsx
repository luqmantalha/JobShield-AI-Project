import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  User,
  Mail,
  LogOut,
  ShieldCheck,
  Info,
  CheckCircle2,
} from "lucide-react";

function Settings() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
      navigate("/login");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white p-10">

      {/* Header */}

      <h1 className="text-4xl font-bold mb-3">
        Settings
      </h1>

      <p className="text-gray-400 mb-10">
        Manage your JobShield AI account and application settings.
      </p>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Account */}

        <div className="bg-[#111827] border border-gray-800 rounded-2xl p-8">

          <div className="flex items-center gap-4 mb-8">

            <div className="bg-violet-600 p-4 rounded-full">

              <User size={34} />

            </div>

            <div>

              <h2 className="text-2xl font-bold">
                {auth.currentUser?.displayName || "JobShield User"}
              </h2>

              <p className="text-gray-400">
                Verified User
              </p>

            </div>

          </div>

          <div className="flex items-center gap-4">

            <Mail className="text-blue-400" size={24} />

            <div>

              <p className="text-gray-400">
                Email
              </p>

              <p className="font-semibold text-lg">
                {auth.currentUser?.email || "Not Logged In"}
              </p>

            </div>

          </div>

        </div>

        {/* Security */}

        <div className="bg-[#111827] border border-gray-800 rounded-2xl p-8">

          <div className="flex items-center gap-3 mb-8">

            <ShieldCheck
              className="text-green-400"
              size={30}
            />

            <h2 className="text-2xl font-bold">
              Security Status
            </h2>

          </div>

          <div className="space-y-5">

            <div className="flex items-center gap-3">

              <CheckCircle2 className="text-green-400" />

              <p>Firebase Authentication Enabled</p>

            </div>

            <div className="flex items-center gap-3">

              <CheckCircle2 className="text-green-400" />

              <p>Google Gemini AI Connected</p>

            </div>

            <div className="flex items-center gap-3">

              <CheckCircle2 className="text-green-400" />

              <p>Firestore Database Connected</p>

            </div>

          </div>

        </div>

        {/* About */}

        <div className="bg-[#111827] border border-gray-800 rounded-2xl p-8">

          <div className="flex items-center gap-3 mb-6">

            <Info
              className="text-blue-400"
              size={30}
            />

            <h2 className="text-2xl font-bold">
              About Application
            </h2>

          </div>

          <p className="text-lg font-semibold">
            JobShield AI
          </p>

          <p className="text-gray-400 mt-2">
            Version 1.0.0
          </p>

          <p className="text-gray-400 mt-4 leading-7">
            AI-powered recruitment fraud detection platform that verifies
            job postings, recruiter identities and offer letters using
            Google Gemini AI and Firebase.
          </p>

        </div>

        {/* Logout */}

        <div className="bg-[#111827] border border-gray-800 rounded-2xl p-8 flex flex-col justify-center">

          <h2 className="text-2xl font-bold mb-3">
            Account Actions
          </h2>

          <p className="text-gray-400 mb-8">
            Securely sign out of your JobShield AI account.
          </p>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-500 transition rounded-xl py-4 flex justify-center items-center gap-3 font-semibold text-lg"
          >

            <LogOut size={24} />

            Logout

          </button>

        </div>

      </div>

    </div>
  );
}

export default Settings;