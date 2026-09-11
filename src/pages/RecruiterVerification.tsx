import { useState } from "react";
import toast from "react-hot-toast";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  BadgeCheck,
  User,
  Mail,
  Building2,
  Loader2,
} from "lucide-react";

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

      const response = await verifyRecruiter(name, company, email);

      const cleanResponse = response
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const aiResult = JSON.parse(cleanResponse);
      setResult(aiResult);

      await addDoc(collection(db, "recruiterScans"), {
        name,
        company,
        email,
        ...aiResult,
        createdAt: serverTimestamp(),
      });

      toast.success("Recruiter verified!");
    } catch (error) {
      console.error(error);
      toast.error("Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const trustColor =
    result?.trustScore >= 80
      ? "text-green-400"
      : result?.trustScore >= 50
      ? "text-yellow-400"
      : "text-red-400";

  const riskBg =
    result?.risk === "LOW"
      ? "bg-green-500/10 text-green-400 border-green-500/30"
      : result?.risk === "MEDIUM"
      ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
      : "bg-red-500/10 text-red-400 border-red-500/30";

  return (
    <div className="text-white">
      {/* Header */}
      <div className="mb-8">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/40 text-green-400 text-xs font-semibold tracking-widest uppercase">
          <BadgeCheck size={13} />
          Recruiter Verification
        </span>
        <h1 className="text-4xl font-bold mt-4">
          AI Recruiter Verification
        </h1>
        <p className="text-gray-400 mt-2 text-base max-w-2xl">
          Enter recruiter details and our AI will cross-check their identity,
          company legitimacy, and email domain to detect fraudulent recruiters.
        </p>
      </div>

      {/* Input Form */}
      <div className="bg-[#0f1829] border border-gray-800 rounded-2xl p-6 mb-8">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              <User size={13} className="text-green-400" />
              Recruiter Name
            </label>
            <input
              className="w-full px-4 py-3 rounded-xl bg-[#1a2438] border border-gray-700 text-sm text-white outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/30 transition placeholder-gray-600"
              placeholder="e.g. John Smith"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              <Building2 size={13} className="text-green-400" />
              Company Name
            </label>
            <input
              className="w-full px-4 py-3 rounded-xl bg-[#1a2438] border border-gray-700 text-sm text-white outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/30 transition placeholder-gray-600"
              placeholder="e.g. Google LLC"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              <Mail size={13} className="text-green-400" />
              Recruiter Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-xl bg-[#1a2438] border border-gray-700 text-sm text-white outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/30 transition placeholder-gray-600"
              placeholder="recruiter@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <button
          onClick={handleVerify}
          disabled={loading}
          className="mt-5 flex items-center gap-3 bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 px-8 py-3 rounded-xl text-sm font-bold shadow-lg shadow-green-500/20"
        >
          {loading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <BadgeCheck size={18} />
          )}
          {loading ? "Verifying..." : "Verify Recruiter"}
        </button>
      </div>

      {/* Results */}
      {result && (
        <>
          {/* Score Cards */}
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-[#0f1829] border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Trust Score</span>
                <ShieldCheck size={17} className="text-green-400" />
              </div>
              <p className={`text-4xl font-bold ${trustColor}`}>
                {result.trustScore}
                <span className="text-2xl text-gray-600">/100</span>
              </p>
              <div className="mt-3 w-full bg-gray-800 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full transition-all duration-700 ${
                    result.trustScore >= 80 ? "bg-green-400" : result.trustScore >= 50 ? "bg-yellow-400" : "bg-red-500"
                  }`}
                  style={{ width: `${result.trustScore}%` }}
                />
              </div>
            </div>

            <div className="bg-[#0f1829] border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Risk Level</span>
                <AlertTriangle size={17} className="text-yellow-400" />
              </div>
              <span className={`inline-flex px-3 py-1 rounded-full text-sm font-bold border ${riskBg}`}>
                {result.risk}
              </span>
              <p className="text-gray-500 text-xs mt-3">
                {result.risk === "LOW" ? "Recruiter appears legitimate" : result.risk === "MEDIUM" ? "Some concerns detected" : "High likelihood of fraud"}
              </p>
            </div>

            <div className="bg-[#0f1829] border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Company Verified</span>
                <Building2 size={17} className="text-blue-400" />
              </div>
              <span
                className={`flex items-center gap-1.5 text-lg font-bold ${
                  result.companyVerified ? "text-green-400" : "text-red-400"
                }`}
              >
                {result.companyVerified ? (
                  <CheckCircle2 size={20} />
                ) : (
                  <XCircle size={20} />
                )}
                {result.companyVerified ? "Verified" : "Not Verified"}
              </span>
            </div>
          </div>

          {/* Details Panel */}
          <div className="bg-[#0f1829] border border-gray-800 rounded-2xl p-6">
            {/* Verdict */}
            <div
              className={`flex items-start gap-3 rounded-xl px-4 py-3 mb-6 ${
                result.risk === "HIGH"
                  ? "bg-red-500/10 border border-red-500/20"
                  : result.risk === "MEDIUM"
                  ? "bg-yellow-500/10 border border-yellow-500/20"
                  : "bg-green-500/10 border border-green-500/20"
              }`}
            >
              {result.risk === "HIGH" ? (
                <AlertTriangle className="text-red-400 mt-0.5 shrink-0" size={20} />
              ) : result.risk === "MEDIUM" ? (
                <AlertTriangle className="text-yellow-400 mt-0.5 shrink-0" size={20} />
              ) : (
                <CheckCircle2 className="text-green-400 mt-0.5 shrink-0" size={20} />
              )}
              <div>
                <p className="font-semibold text-white text-sm">AI Recommendation</p>
                <p className="text-gray-300 text-sm mt-1 leading-6">
                  {result.recommendation}
                </p>
              </div>
            </div>

            {/* Reasons */}
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Analysis Details
            </h3>
            <div className="space-y-2.5">
              {result.reasons?.map((reason: string, index: number) => (
                <div key={index} className="flex gap-2.5 items-start">
                  <CheckCircle2 className="text-green-400 mt-0.5 shrink-0" size={15} />
                  <p className="text-gray-300 text-sm leading-6">{reason}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default RecruiterVerification;