import { useState } from "react";
import toast from "react-hot-toast";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";
import { verifyRecruiter } from "../services/recruiterAI";

function RecruiterVerification() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleVerify = async () => {
    if (!name || !company || !email) {
      toast.error("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await verifyRecruiter(
        name,
        company,
        email
      );

      const aiResult = JSON.parse(response);

      setResult(aiResult);

      await addDoc(
        collection(db, "recruiterScans"),
        {
          name,
          company,
          email,
          ...aiResult,
          createdAt: serverTimestamp(),
        }
      );

      toast.success("Recruiter Verified!");

    } catch (error) {
      console.error(error);
      toast.error("Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white p-10">

      <h1 className="text-4xl font-bold mb-3">
        AI Recruiter Verification
      </h1>

      <p className="text-gray-400 mb-10">
        Verify recruiter identity using AI.
      </p>

      <div className="bg-[#111827] rounded-2xl p-8 border border-gray-700">

        <input
          className="w-full p-4 rounded-xl bg-[#1f2937] mb-5"
          placeholder="Recruiter Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          className="w-full p-4 rounded-xl bg-[#1f2937] mb-5"
          placeholder="Company Name"
          value={company}
          onChange={(e)=>setCompany(e.target.value)}
        />

        <input
          className="w-full p-4 rounded-xl bg-[#1f2937]"
          placeholder="Recruiter Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <button
          onClick={handleVerify}
          disabled={loading}
          className="mt-6 bg-violet-600 hover:bg-violet-500 px-8 py-4 rounded-xl font-semibold"
        >
          {loading ? "Verifying..." : "Verify Recruiter"}
        </button>

      </div>

      {result && (

        <div className="bg-[#111827] rounded-2xl p-8 mt-10">

          <div className="grid md:grid-cols-3 gap-6">

            <div>

              <ShieldCheck
                className="text-green-400"
                size={32}
              />

              <h3 className="mt-3 text-xl">
                Trust Score
              </h3>

              <p className="text-5xl font-bold text-green-400 mt-3">
                {result.trustScore}
              </p>

            </div>

            <div>

              <h3 className="text-xl">
                Risk
              </h3>

              <p className="text-4xl font-bold mt-3">
                {result.risk}
              </p>

            </div>

            <div>

              <h3 className="text-xl">
                Company Verified
              </h3>

              <p className="text-3xl font-bold mt-3">
                {result.companyVerified ? "Yes" : "No"}
              </p>

            </div>

          </div>

          <h2 className="text-2xl font-bold mt-10 mb-4">
            Recommendation
          </h2>

          <p className="text-gray-300">
            {result.recommendation}
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4">
            Reasons
          </h2>

          <div className="space-y-3">

            {result.reasons?.map(
              (reason:string,index:number)=>(

                <div
                  key={index}
                  className="flex gap-3"
                >

                  <CheckCircle2
                    className="text-green-400"
                  />

                  <p>{reason}</p>

                </div>

              )
            )}

          </div>

        </div>

      )}

    </div>
  );
}

export default RecruiterVerification;