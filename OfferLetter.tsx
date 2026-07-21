import { useState } from "react";
import toast from "react-hot-toast";
import {
  Upload,
  ShieldCheck,
  AlertTriangle,
  Brain,
  Building2,
  CheckCircle2,
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

  const analyzeFile = async () => {
    if (!file) {
      toast.error("Please upload an Offer Letter.");
      return;
    }

    try {
      setLoading(true);

      setLoadingText("Extracting document...");

      const extractedText = await extractText(file);
      if (extractedText.trim().length < 20) {
        toast.error(
          "Unable to read text from this PDF. Please upload a DOCX file."
        );
        return;
      }
      console.log("File Type:", file.type);
      console.log("File Size:", file.size);

      console.log("==============");
      console.log("Extracted Text:");
      console.log(extractedText);
      console.log("Length:", extractedText.length);
      console.log("==============");

      setLoadingText("Analyzing with AI...");

      const response = await analyzeOfferLetter(extractedText);

      const aiResult = JSON.parse(response);

      setResult(aiResult);

      toast.success("Offer Letter analyzed!");

      await addDoc(collection(db, "offerLetterScans"), {
        fileName: file.name,
        ...aiResult,
        createdAt: serverTimestamp(),
      });

    } catch (error) {
      console.error(error);
      toast.error("Analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white p-10">

  <h1 className="text-4xl font-bold mb-3">
    AI Offer Letter Verification
  </h1>

  <p className="text-gray-400 mb-10">
    Upload an Offer Letter and let AI detect fake recruiters,
    forged companies and scam offers.
  </p>

  <div className="bg-[#111827] rounded-2xl p-8 border border-gray-700">

    <input
      type="file"
      accept=".pdf,.docx"
      onChange={(e) => {
        if (e.target.files?.length) {
          setFile(e.target.files[0]);
        }
      }}
    />

    <button
      onClick={analyzeFile}
      disabled={loading}
      className="mt-6 bg-violet-600 hover:bg-violet-500 transition px-8 py-4 rounded-xl flex items-center gap-3 text-lg font-semibold disabled:opacity-50"
    >
      <Upload size={22} />

      {loading ? loadingText : "Analyze Offer Letter"}

    </button>

  </div>

  {result && (

    <>

      <div className="grid md:grid-cols-4 gap-6 mt-12">

        <div className="bg-[#111827] rounded-2xl p-6">

          <ShieldCheck
            className="text-green-400 mb-4"
            size={34}
          />

          <h3 className="text-xl font-semibold">
            Trust Score
          </h3>

          <p className="text-5xl font-bold mt-4 text-green-400">
            {result.trustScore}/100
          </p>

        </div>

        <div className="bg-[#111827] rounded-2xl p-6">

          <AlertTriangle
            className="text-yellow-400 mb-4"
            size={34}
          />

          <h3 className="text-xl font-semibold">
            Risk Level
          </h3>

          <p className="text-5xl font-bold mt-4">
            {result.risk}
          </p>

        </div>

        <div className="bg-[#111827] rounded-2xl p-6">

          <Brain
            className="text-purple-400 mb-4"
            size={34}
          />

          <h3 className="text-xl font-semibold">
            AI Confidence
          </h3>

          <p className="text-5xl font-bold mt-4 text-purple-400">
            {result.aiConfidence}%
          </p>

        </div>

        <div className="bg-[#111827] rounded-2xl p-6">

          <Building2
            className="text-blue-400 mb-4"
            size={34}
          />

          <h3 className="text-xl font-semibold">
            Company
          </h3>

          <p className="text-3xl font-bold mt-4 text-blue-400">
            {result.company}
          </p>

        </div>

      </div>

      <div className="bg-[#111827] rounded-2xl p-8 mt-10">

        <h2 className="text-3xl font-bold mb-6">
          AI Recommendation
        </h2>

        <p className="text-lg text-gray-300 leading-8">
          {result.recommendation}
        </p>

        <h3 className="text-2xl font-bold mt-10 mb-6">
          Why this score?
        </h3>

        <div className="space-y-4">

          {result.reasons?.map((reason: string, index: number) => (

            <div
              key={index}
              className="flex gap-3 items-start"
            >

              <CheckCircle2
                className="text-green-400 mt-1"
                size={20}
              />

              <p className="text-gray-300">
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
          {result.scamDetected
            ? "Fake Offer Letter"
            : "Offer Letter Verified"}
        </button>
        <button
          onClick={() => downloadOfferLetterReport(result)}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-xl font-semibold transition"
        >
          Download PDF Report
        </button>

      </div>

    </>

  )}

</div>

);

}

export default OfferLetter;