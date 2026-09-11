import { useState, useRef } from "react";
import toast from "react-hot-toast";
import {
  Upload,
  ShieldCheck,
  AlertTriangle,
  Brain,
  Building2,
  CheckCircle2,
  XCircle,
  FileText,
  Download,
  Loader2,
  File,
  X,
} from "lucide-react";

import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";
import { extractText } from "../utils/extractText";
import { analyzeOfferLetter } from "../services/offerLetterAI";
import { downloadOfferLetterReport } from "../utils/offerLetterPdf";

function OfferLetter() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Analyzing...");
  const [result, setResult] = useState<any>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    const allowed = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowed.includes(f.type)) {
      toast.error("Only PDF and DOCX files are supported.");
      return;
    }
    setFile(f);
    setResult(null);
  };

  const analyzeFile = async () => {
    if (!file) {
      toast.error("Please upload an Offer Letter.");
      return;
    }

    try {
      setLoading(true);
      setLoadingText("Extracting document text...");

      const extractedText = await extractText(file);

      if (extractedText.trim().length < 20) {
        toast.error("Could not read text from this file. Please upload a text-based PDF or DOCX.");
        return;
      }

      setLoadingText("Analyzing with AI...");
      const response = await analyzeOfferLetter(extractedText);

      const cleanResponse = response
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const aiResult = JSON.parse(cleanResponse);
      setResult(aiResult);
      toast.success("Offer Letter analyzed!");

      await addDoc(collection(db, "offerLetterScans"), {
        fileName: file.name,
        ...aiResult,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error(error);
      toast.error("Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const trustColor =
    result?.trustScore >= 80
      ? "text-green-400"
      : result?.trustScore >= 50
      ? "text-yellow-400"
      : "text-red-500";

  return (
    <div className="text-white">
      {/* Header */}
      <div className="mb-8">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/40 text-blue-400 text-xs font-semibold tracking-widest uppercase">
          <FileText size={13} />
          Offer Letter Verification
        </span>
        <h1 className="text-4xl font-bold mt-4">
          AI Offer Letter Verification
        </h1>
        <p className="text-gray-400 mt-2 text-base max-w-2xl">
          Upload your offer letter and let our AI detect fake recruiters,
          forged company details, and scam patterns instantly.
        </p>
      </div>

      {/* Upload Card */}
      <div className="bg-[#0f1829] border border-gray-800 rounded-2xl p-6 mb-8">
        {/* Drop Zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            const dropped = e.dataTransfer.files[0];
            if (dropped) handleFile(dropped);
          }}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-200 ${
            dragOver
              ? "border-violet-500 bg-violet-500/5"
              : file
              ? "border-green-500/40 bg-green-500/5"
              : "border-gray-700 hover:border-violet-500/60 hover:bg-violet-500/5"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.docx"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.length) handleFile(e.target.files[0]);
            }}
          />

          {file ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                <File size={26} className="text-green-400" />
              </div>
              <div>
                <p className="font-semibold text-white">{file.name}</p>
                <p className="text-gray-500 text-sm mt-0.5">
                  {(file.size / 1024).toFixed(1)} KB &middot;{" "}
                  {file.type.includes("pdf") ? "PDF" : "DOCX"}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                  setResult(null);
                }}
                className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 mt-1 transition"
              >
                <X size={13} /> Remove file
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center">
                <Upload size={26} className="text-violet-400" />
              </div>
              <div>
                <p className="text-white font-semibold">
                  Drag & drop your offer letter
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  or click to browse &middot; PDF or DOCX supported
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Analyze Button */}
        <button
          onClick={analyzeFile}
          disabled={loading || !file}
          className="mt-4 w-full flex items-center justify-center gap-3 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 py-3.5 rounded-xl text-sm font-bold shadow-lg shadow-violet-500/20"
        >
          {loading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Upload size={18} />
          )}
          {loading ? loadingText : "Analyze Offer Letter"}
        </button>
      </div>

      {result && (
        <>
          {/* Score Cards */}
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            {/* Trust Score */}
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

            {/* Risk Level */}
            <div className="bg-[#0f1829] border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Risk Level</span>
                <AlertTriangle size={17} className="text-yellow-400" />
              </div>
              <span
                className={`inline-flex px-3 py-1 rounded-full text-sm font-bold border ${
                  result.risk === "LOW"
                    ? "bg-green-500/10 text-green-400 border-green-500/30"
                    : result.risk === "MEDIUM"
                    ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
                    : "bg-red-500/10 text-red-400 border-red-500/30"
                }`}
              >
                {result.risk}
              </span>
            </div>

            {/* AI Confidence */}
            <div className="bg-[#0f1829] border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">AI Confidence</span>
                <Brain size={17} className="text-violet-400" />
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
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Company</span>
                <Building2 size={17} className="text-blue-400" />
              </div>
              <p className="text-lg font-bold text-blue-400 leading-tight">
                {result.company || "Unknown"}
              </p>
              <p className="text-gray-600 text-xs mt-1">Extracted by AI</p>
            </div>
          </div>

          {/* Analysis Panel */}
          <div className="bg-[#0f1829] border border-gray-800 rounded-2xl p-6">
            {/* Verdict */}
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
              <div>
                <p className="font-semibold text-white text-sm">
                  {result.scamDetected ? "⚠️ Fake Offer Detected" : "✅ Offer Letter Appears Legitimate"}
                </p>
                <p className="text-gray-300 text-sm mt-1 leading-6">
                  {result.recommendation}
                </p>
              </div>
            </div>

            {/* Reasons */}
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Why this score
            </h3>
            <div className="space-y-2.5 mb-6">
              {result.reasons?.map((reason: string, index: number) => (
                <div key={index} className="flex gap-2.5 items-start">
                  {result.scamDetected ? (
                    <XCircle className="text-red-400 mt-0.5 shrink-0" size={15} />
                  ) : (
                    <CheckCircle2 className="text-green-400 mt-0.5 shrink-0" size={15} />
                  )}
                  <p className="text-gray-300 text-sm leading-6">{reason}</p>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3 flex-wrap">
              <button
                className={`flex-1 py-3 px-5 rounded-xl text-sm font-bold transition ${
                  result.scamDetected
                    ? "bg-red-600 hover:bg-red-500 text-white"
                    : "bg-green-600 hover:bg-green-500 text-white"
                }`}
              >
                {result.scamDetected ? "⛔ Do Not Accept" : "✅ Safe to Accept"}
              </button>
              <button
                onClick={() => downloadOfferLetterReport(result)}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-sm font-bold bg-[#1a2438] hover:bg-[#212f45] border border-gray-700 hover:border-violet-500/50 transition"
              >
                <Download size={15} />
                Download PDF Report
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default OfferLetter;