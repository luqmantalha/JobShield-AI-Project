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
} from "lucide-react";

import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";
import { analyzeJob as analyzeWithAI } from "../services/gemini";
import { downloadReport } from "../utils/pdfReport";

function VerifyJob() {
  const [jobUrl, setJobUrl] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [loadingText, setLoadingText] = useState("Analyzing...");


  const analyzeJob = async () => {
    if (!jobUrl && !jobDescription) {
      toast.error("Please enter a Job URL or Job Description.");
      return;
    }

    setLoading(true);
    setLoadingText("Checking company...");

    try {
    const input = `
    Job URL:
    ${jobUrl}

    Job Description:
    ${jobDescription}
    `;

    //console.log("Calling AI...");
    //console.log("Before calling analyzeWithAI");
    
    setLoadingText("Analyzing job description...");
    console.time("AI Response Time");
    const response = await analyzeWithAI(input);
    console.timeEnd("AI Response Time");
    //console.log("After calling analyzeWithAI");

    //console.log("AI Response:", response);

    const cleanResponse = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    
    setLoadingText("Calculating trust score...");
    const aiResult = JSON.parse(cleanResponse);
    let confidence = 100;

    if (!aiResult.domainVerified) confidence -= 20;
    if (!aiResult.recruiterVerified) confidence -= 20;
    if (!aiResult.salaryNormal) confidence -= 15;
    if (aiResult.scamDetected) confidence -= 25;

    aiResult.aiConfidence = Math.max(0, confidence);

    //console.log("Parsed Result:", aiResult);
    setLoadingText("Generating report...");
    setResult(aiResult);
    toast.success("Job analyzed successfully!");

    console.time("Firebase Save");

    await addDoc(collection(db, "jobScans"), {
      jobUrl,
      jobDescription,
      ...aiResult,
      createdAt: serverTimestamp(),
    });

    console.timeEnd("Firebase Save");
  
  } catch (error: any) {
    console.error("FULL ERROR:", error);

    if (error.response) {
      console.log("Status:", error.response.status);
      console.log("Response:", error.response.data);
    }

    toast.error("Failed to analyze the job.");
  } finally {
    console.log("Setting loading to false");
    setLoading(false);
  }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white p-8">

      {/* Header */}

      <div className="mb-10">

        <span className="px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500 text-violet-400 text-sm">
          AI JOB VERIFICATION
        </span>

        <h1 className="text-5xl font-bold mt-5">
          Verify Any Job Posting
        </h1>

        <p className="text-gray-400 mt-4 text-lg">
          Our AI analyzes recruiter identity, company legitimacy,
          salary patterns, suspicious language, and scam databases.
        </p>

      </div>

      {/* Input */}

      <div className="bg-[#111827] border border-gray-800 rounded-3xl p-8">

        <label className="text-gray-300 font-medium">
          Job URL
        </label>

        <input
          value={jobUrl}
          onChange={(e) => setJobUrl(e.target.value)}
          placeholder="https://company.com/careers/software-engineer"
          className="w-full mt-3 bg-[#1F2937] rounded-xl border border-gray-700 p-4 outline-none focus:border-violet-500"
        />

        <label className="block mt-8 text-gray-300 font-medium">
          Job Description
        </label>

        <textarea
          rows={7}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the complete job description here..."
          className="w-full mt-3 bg-[#1F2937] rounded-xl border border-gray-700 p-4 outline-none focus:border-violet-500"
        />

        <button
          onClick={analyzeJob}
          disabled={loading}
          className="mt-8 bg-violet-600 hover:bg-violet-500 transition px-8 py-4 rounded-xl flex items-center gap-3 text-lg font-semibold disabled:opacity-50"
        >
          <Search size={22} />

          {loading ? loadingText: "Analyze Job"}

        </button>

      </div>

      {result && (

        <>

          {/* Score */}

          <div className="grid lg:grid-cols-4 gap-6 mt-10">

            <div className="bg-[#111827] rounded-3xl p-8 border border-gray-800">

              <ShieldCheck
                className="text-green-400 mb-5"
                size={40}
              />

              <h3 className="text-xl font-semibold">
                Trust Score
              </h3>

              <h2
                className={`text-5xl font-bold ${
                  result.trustScore >= 80
                    ? "text-green-400"
                    : result.trustScore >= 50
                    ? "text-yellow-400"
                    : "text-red-500"
                }`}
              >
                {result.trustScore}/100
              </h2>

            </div>

            <div className="bg-[#111827] rounded-3xl p-8 border border-gray-800">

              <AlertTriangle
                className="text-yellow-400 mb-5"
                size={40}
              />

              <h3 className="text-xl font-semibold">
                Risk Level
              </h3>

              <h2 className="text-5xl font-bold text-yellow-400 mt-4">
                {result.risk}
              </h2>

            </div>

            <div className="bg-[#111827] rounded-3xl p-8 border border-gray-800">

              <Brain
                className="text-violet-400 mb-5"
                size={40}
              />

              <h3 className="text-xl font-semibold">
                AI Confidence
              </h3>

              <h2 className="text-5xl font-bold text-violet-400 mt-4">
                {result.aiConfidence}%
              </h2>

              {/* Progress Bar */}

              <div className="w-full bg-gray-700 rounded-full h-3 mt-8">

                <div
                  className="bg-violet-500 h-3 rounded-full transition-all duration-700"
                  style={{
                    width: `${result.aiConfidence}%`,
                  }}
                />

              </div>

            </div>

            <div className="bg-[#111827] rounded-3xl p-8 border border-gray-800">

              <Building2
                className="text-blue-400 mb-5"
                size={40}
              />

              <h3 className="text-xl font-semibold">
                Company
              </h3>

              <h2 className="text-2xl font-bold text-blue-400 mt-4">
                {result.company}
              </h2>

            </div>

          </div>

          {/* Detailed Analysis */}

          <div className="grid lg:grid-cols-2 gap-8 mt-10">

            <div className="bg-[#111827] rounded-3xl border border-gray-800 p-8">

              <h2 className="text-2xl font-bold mb-8">
                Verification Report
              </h2>

              <div className="space-y-6">

                <div className="flex justify-between">
                  <span className="flex items-center gap-3">
                    <Globe className="text-green-400" />
                    Domain Verification
                  </span>
                  <span className="text-green-400">{result.domainVerified ? "Verified" : "Not Verified"}</span>
                </div>

                <div className="flex justify-between">
                  <span className="flex items-center gap-3">
                    <BadgeCheck className="text-green-400" />
                    Recruiter Identity
                  </span>
                  <span className="text-green-400">{result.recruiterVerified ? "Verified" : "Not Verified"}</span>
                </div>

                <div className="flex justify-between">
                  <span className="flex items-center gap-3">
                    <DollarSign className="text-yellow-400" />
                    Salary Pattern
                  </span>
                  <span className="text-yellow-400">{result.salaryNormal ? "Normal" : "Suspicious"}</span>
                </div>

                <div className="flex justify-between">
                  <span className="flex items-center gap-3">
                    <AlertTriangle className="text-red-400" />
                    Scam Database
                  </span>
                  <span
                    className={`${
                      result.scamDetected ? "text-red-500" : "text-green-400"
                    }`}
                  >
                    {result.scamDetected ? "Scam Found" : "No Match"}
                  </span>
                </div>

              </div>

            </div>

            <div className="bg-[#111827] rounded-3xl border border-gray-800 p-8">

              <h2 className="text-2xl font-bold mb-8">
                AI Recommendation
              </h2>

              <div className="flex items-start gap-4">

                {result.scamDetected ? (
                  <AlertTriangle
                    className="text-red-500 mt-1"
                    size={28}
                  />
                ) : (
                  <CheckCircle2
                    className="text-green-400 mt-1"
                    size={28}
                  />
                )}
              
                <p className="text-gray-300 leading-8 text-lg">
                  {result.recommendation}
                </p>

              </div>

              <h3 className="text-2xl font-bold mt-10 mb-6">
                Why this job received this score
              </h3>

              <div className="space-y-4">
                {result.reasons?.map((reason: string, index: number) => (
                  <div key={index} className="flex gap-3 items-start">
                    <CheckCircle2
                      className="text-green-400 mt-1"
                      size={20}
                    />
                    <p className="text-gray-300 text-lg leading-8">
                      {reason}
                    </p>
                  </div>
                ))}
              </div>
              
              <button
                className={`mt-10 px-8 py-4 rounded-xl font-semibold transition ${
                  result.scamDetected
                    ? "bg-red-600 hover:bg-red-500"
                    : "bg-green-600 hover:bg-green-500"
                }`}
              >
                {result.scamDetected ? "Do Not Apply" : "Safe to Apply"}
              </button>
              <button
                onClick={() => downloadReport(result)}
                className="mt-4 w-full bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-xl font-semibold transition"
              >
                Download PDF Report
              </button>

            </div>

          </div>

        </>

      )}

    </div>
  );
}

export default VerifyJob;