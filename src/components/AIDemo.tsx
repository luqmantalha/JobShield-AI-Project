import { SearchCheck, ShieldAlert, ShieldCheck } from "lucide-react";

function AIDemo() {
  return (
    <section className="bg-[#050816] py-32">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
            Live AI Scam Detection
          </h2>

          <p className="text-gray-400 text-lg md:text-xl leading-8 max-w-3xl mx-auto">
            Watch how JobShield AI analyzes a job posting in real time and
            detects fraudulent recruitment with AI-powered verification.
          </p>
        </div>

        {/* Main Card */}
        <div className="max-w-5xl mx-auto bg-[#111827] rounded-3xl border border-gray-800 p-10 md:p-12 shadow-2xl">

          {/* URL */}
          <div className="bg-[#1F2937] rounded-2xl px-6 py-4 text-gray-300 text-base md:text-lg mb-10 break-all">
            https://jobs.microsoft-careers.xyz/software-engineer
          </div>

          {/* Scan Results */}
          <div className="space-y-6">

            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <span className="text-gray-300 text-lg">
                Scanning Company Domain
              </span>

              <span className="text-green-400 font-semibold text-lg">
                ✓ Verified
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <span className="text-gray-300 text-lg">
                Checking Recruiter Identity
              </span>

              <span className="text-green-400 font-semibold text-lg">
                ✓ Verified
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <span className="text-gray-300 text-lg">
                Salary Pattern Analysis
              </span>

              <span className="text-yellow-400 font-semibold text-lg">
                Warning
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-300 text-lg">
                Scam Database Match
              </span>

              <span className="text-red-400 font-semibold text-lg">
                Suspicious
              </span>
            </div>

          </div>

          {/* Progress */}
          <div className="mt-12">

            <div className="flex justify-between items-center mb-4">

              <div className="flex items-center text-gray-300 text-lg">
                <SearchCheck
                  size={22}
                  className="text-violet-500 mr-3"
                />

                AI Confidence
              </div>

              <span className="text-violet-400 text-xl font-bold">
                98%
              </span>

            </div>

            <div className="w-full h-4 rounded-full bg-gray-700 overflow-hidden">
              <div className="h-4 w-[98%] rounded-full bg-gradient-to-r from-violet-500 to-purple-600"></div>
            </div>

          </div>

          {/* Bottom Cards */}
          <div className="grid md:grid-cols-2 gap-8 mt-14">

            {/* Risk */}
            <div className="bg-[#1F2937] rounded-2xl border border-gray-800 p-8 hover:border-red-500 transition-all duration-300 hover:-translate-y-1">

              <ShieldAlert
                size={40}
                className="text-red-500 mb-5"
              />

              <h3 className="text-white text-2xl font-bold mb-4">
                Risk Score
              </h3>

              <p className="text-red-400 text-5xl font-extrabold">
                HIGH
              </p>

            </div>

            {/* Recommendation */}
            <div className="bg-[#1F2937] rounded-2xl border border-gray-800 p-8 hover:border-green-500 transition-all duration-300 hover:-translate-y-1">

              <ShieldCheck
                size={40}
                className="text-green-500 mb-5"
              />

              <h3 className="text-white text-2xl font-bold mb-4">
                Recommendation
              </h3>

              <p className="text-green-400 text-4xl font-extrabold leading-tight">
                Manual Review
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default AIDemo;