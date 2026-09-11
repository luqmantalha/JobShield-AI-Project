import { useState } from "react";
import toast from "react-hot-toast";
import {
  Search,
  ShieldCheck,
  AlertTriangle,
  Globe,
  Building2,
  Brain,
  BadgeCheck,
  DollarSign,
  CheckCircle2,
  XCircle,
  Link2,
  FileText,
  Download,
  Loader2,
} from "lucide-react";

import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";
import { analyzeJob as analyzeWithAI } from "../services/gemini";
import { downloadReport } from "../utils/pdfReport";

const LOADING_STEPS = [
  "Checking company legitimacy...",
  "Analyzing job description...",
  "Scanning scam databases...",
  "Calculating trust score...",
  "Generating report...",
];

function VerifyJob() {
  const [jobUrl, setJobUrl] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [loadingStep, setLoadingStep] = useState(0);

  const cycleLoadingText = () => {
    let step = 0;
    const interval = setInterval(() => {
      step = (step + 1) % LOADING_STEPS.length;
      setLoadingStep(step);
    }, 1800);
    return interval;
  };

  const analyzeJob = async () => {
    if (!jobUrl && !jobDescription) {
      toast.error("Please enter a Job URL or Job Description.");
      return;
    }

    setLoading(true);
    setLoadingStep(0);
    const interval = cycleLoadingText();

    try {
      const input = `
      Job URL:
      ${jobUrl}

      Job Description:
      ${jobDescription}
      `;

      const response = await analyzeWithAI(input);

      const cleanResponse = response
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const aiResult = JSON.parse(cleanResponse);
      let confidence = 100;

      if (!aiResult.domainVerified) confidence -= 20;
      if (!aiResult.recruiterVerified) confidence -= 20;
      if (!aiResult.salaryNormal) confidence -= 15;
      if (aiResult.scamDetected) confidence -= 25;

      aiResult.aiConfidence = Math.max(0, confidence);

      setResult(aiResult);
      toast.success("Job analyzed successfully!");

      await addDoc(collection(db, "jobScans"), {
        jobUrl,
        jobDescription,
        ...aiResult,
        createdAt: serverTimestamp(),
      });
    } catch (error: any) {
      console.error("Analysis error:", error);
      toast.error("Failed to analyze the job. Please try again.");
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  const trustColor =
    result?.trustScore >= 80
      ? "text-green-400"
      : result?.trustScore >= 50
      ? "text-yellow-400"
      : "text-red-500";

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
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/40 text-violet-400 text-xs font-semibold tracking-widest uppercase">
          <Brain size={13} />
          AI Job Verification
        </span>
        <h1 className="text-4xl font-bold mt-4 text-white">
          Verify Any Job Posting
        </h1>
        <p className="text-gray-400 mt-2 text-base max-w-2xl">
          Our AI analyzes recruiter identity, company legitimacy, salary
          patterns, suspicious language, and scam databases in seconds.
        </p>
      </div>

      {/* Input Card */}
      <div className="bg-[#0f1829] border border-gray-800 rounded-2xl p-6 mb-8">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Job URL */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2">
              <Link2 size={15} className="text-violet-400" />
              Job URL
              <span className="text-gray-600 font-normal">(optional)</span>
            </label>
            <input
              value={jobUrl}
              onChange={(e) => setJobUrl(e.target.value)}
              placeholder="https://company.com/careers/software-engineer"
              className="w-full bg-[#1a2438] rounded-xl border border-gray-700 px-4 py-3 text-sm text-white outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition placeholder-gray-600"
            />
          </div>

          {/* Analyze button (aligned right on large) */}
          <div className="flex lg:items-end">
            <button
              onClick={analyzeJob}
              disabled={loading}
              className="w-full lg:w-auto flex items-center justify-center gap-3 bg-violet-600 hover:bg-violet-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 px-8 py-3 rounded-xl text-sm font-semibold shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Search size={18} />
              )}
              {loading ? LOADING_STEPS[loadingStep] : "Analyze Job"}
            </button>
          </div>
        </div>

        {/* Job Description */}
        <div className="mt-6">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2">
            <FileText size={15} className="text-violet-400" />
            Job Description
          </label>
          <textarea
            rows={7}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the complete job description here..."
            className="w-full bg-[#1a2438] rounded-xl border border-gray-700 px-4 py-3 text-sm text-white outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition resize-none placeholder-gray-600"
          />
        </div>

        {/* Loading progress bar */}
        {loading && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>{LOADING_STEPS[loadingStep]}</span>
              <span className="text-violet-400 animate-pulse">Processing...</span>
            </div>
            <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-violet-600 to-blue-500 rounded-full animate-pulse" style={{ width: "60%" }} />
            </div>
          </div>
        )}
      </div>

      {result && (
        <>
          {/* Score Cards */}
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            {/* Trust Score */}
            <div className="bg-[#0f1829] border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Trust Score</span>
                <ShieldCheck size={18} className="text-green-400" />
              </div>
              <p className={`text-4xl font-bold ${trustColor}`}>
                {result.trustScore}
                <span className="text-2xl text-gray-600">/100</span>
              </p>
              <div className="mt-3 w-full bg-gray-800 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full transition-all duration-700 ${
                    result.trustScore >= 80
                      ? "bg-green-400"
                      : result.trustScore >= 50
                      ? "bg-yellow-400"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${result.trustScore}%` }}
                />
              </div>
            </div>

            {/* Risk Level */}
            <div className="bg-[#0f1829] border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Risk Level</span>
                <AlertTriangle size={18} className="text-yellow-400" />
              </div>
              <span className={`inline-flex px-3 py-1 rounded-full text-sm font-bold border ${riskBg}`}>
                {result.risk}
              </span>
              <p className="text-gray-500 text-xs mt-3">
                {result.risk === "LOW"
                  ? "Low probability of fraud"
                  : result.risk === "MEDIUM"
                  ? "Some suspicious signals found"
                  : "High risk — do not apply"}
              </p>
            </div>

            {/* AI Confidence */}
            <div className="bg-[#0f1829] border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">AI Confidence</span>
                <Brain size={18} className="text-violet-400" />
              </div>
              <p className="text-4xl font-bold text-violet-400">
                {result.aiConfidence}
                <span className="text-2xl text-gray-600">%</span>
              </p>
              <div className="mt-3 w-full bg-gray-800 rounded-full h-1.5">
                <div
                  className="h-1.5 rounded-full bg-violet-500 transition-all duration-700"
                  style={{ width: `${result.aiConfidence}%` }}
                />
              </div>
            </div>

            {/* Company */}
            <div className="bg-[#0f1829] border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Company</span>
                <Building2 size={18} className="text-blue-400" />
              </div>
              <p className="text-lg font-bold text-blue-400 leading-tight">
                {result.company || "Unknown"}
              </p>
              <p className="text-gray-600 text-xs mt-2">Extracted by AI</p>
            </div>
          </div>

          {/* Analysis Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Verification Checklist */}
            <div className="bg-[#0f1829] border border-gray-800 rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
                <ShieldCheck size={20} className="text-violet-400" />
                Verification Checklist
              </h2>

              <div className="space-y-4">
                {[
                  {
                    icon: Globe,
                    label: "Domain Verification",
                    value: result.domainVerified,
                    trueText: "Verified",
                    falseText: "Not Verified",
                    color: "text-blue-400",
                  },
                  {
                    icon: BadgeCheck,
                    label: "Recruiter Identity",
                    value: result.recruiterVerified,
                    trueText: "Verified",
                    falseText: "Not Verified",
                    color: "text-green-400",
                  },
                  {
                    icon: DollarSign,
                    label: "Salary Pattern",
                    value: result.salaryNormal,
                    trueText: "Normal Range",
                    falseText: "Suspicious",
                    color: "text-yellow-400",
                  },
                  {
                    icon: AlertTriangle,
                    label: "Scam Database",
                    value: !result.scamDetected,
                    trueText: "No Match",
                    falseText: "Scam Detected!",
                    color: "text-red-400",
                  },
                ].map(({ icon: Icon, label, value, trueText, falseText, color }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between py-3 border-b border-gray-800/60 last:border-0"
                  >
                    <span className="flex items-center gap-3 text-gray-300 text-sm">
                      <Icon size={16} className={color} />
                      {label}
                    </span>
                    <span
                      className={`flex items-center gap-1.5 text-sm font-semibold ${
                        value ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {value ? (
                        <CheckCircle2 size={15} />
                      ) : (
                        <XCircle size={15} />
                      )}
                      {value ? trueText : falseText}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Recommendation */}
            <div className="bg-[#0f1829] border border-gray-800 rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Brain size={20} className="text-violet-400" />
                AI Recommendation
              </h2>

              {/* Verdict Banner */}
              <div
                className={`flex items-start gap-3 rounded-xl px-4 py-3 mb-6 ${
                  result.scamDetected
                    ? "bg-red-500/10 border border-red-500/20"
                    : "bg-green-500/10 border border-green-500/20"
                }`}
              >
                {result.scamDetected ? (
                  <AlertTriangle className="text-red-400 mt-0.5 shrink-0" size={20} />
                ) : (
                  <CheckCircle2 className="text-green-400 mt-0.5 shrink-0" size={20} />
                )}
                <p className="text-gray-200 text-sm leading-6">
                  {result.recommendation}
                </p>
              </div>

              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Why this score
              </h3>
              <div className="space-y-2.5">
                {result.reasons?.map((reason: string, index: number) => (
                  <div key={index} className="flex gap-2.5 items-start">
                    <CheckCircle2
                      className="text-violet-400 mt-0.5 shrink-0"
                      size={15}
                    />
                    <p className="text-gray-300 text-sm leading-6">{reason}</p>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-3 mt-6 flex-wrap">
                <button
                  className={`flex-1 px-5 py-3 rounded-xl text-sm font-bold transition ${
                    result.scamDetected
                      ? "bg-red-600 hover:bg-red-500 text-white"
                      : "bg-green-600 hover:bg-green-500 text-white"
                  }`}
                >
                  {result.scamDetected ? "⛔ Do Not Apply" : "✅ Safe to Apply"}
                </button>
                <button
                  onClick={() => downloadReport(result)}
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold bg-[#1a2438] hover:bg-[#212f45] border border-gray-700 hover:border-violet-500/50 transition"
                >
                  <Download size={15} />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default VerifyJob;