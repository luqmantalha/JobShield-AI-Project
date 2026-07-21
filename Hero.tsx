import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#050816] py-32">

      {/* Background Blur */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-20 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">

        {/* Left Side */}

        <div>

          {/* Badge */}

          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500 bg-violet-500/10 px-5 py-2 text-violet-400 font-medium mb-8">

            <Sparkles size={18} />

            AI + Blockchain Powered Platform

          </div>

          {/* Heading */}

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight text-white">

            Secure Every

            <br />

            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              Hiring Decision
            </span>

          </h1>

          {/* Description */}

          <p className="mt-8 text-lg md:text-xl leading-9 text-gray-400 max-w-2xl">

            Detect fake job postings, verify recruiter identities,
            validate offer letters, calculate company trust scores,
            and secure hiring with Artificial Intelligence and Blockchain.

          </p>

          {/* Buttons */}

          <div className="flex flex-wrap gap-6 mt-12">

            <button className="bg-violet-600 hover:bg-violet-500 transition-all duration-300 hover:scale-105 rounded-xl px-8 py-4 font-semibold text-lg shadow-xl">

              Get Started

            </button>

            <button className="flex items-center gap-3 border border-gray-700 hover:border-violet-500 hover:bg-violet-500 transition-all duration-300 rounded-xl px-8 py-4 font-semibold text-lg">

              Live Demo

              <ArrowRight size={20} />

            </button>

          </div>

          {/* Trust Badges */}

          <div className="flex flex-wrap gap-8 mt-14">

            <div className="flex items-center gap-3">

              <ShieldCheck className="text-green-400" />

              <span className="text-gray-300">
                AI Scam Detection
              </span>

            </div>

            <div className="flex items-center gap-3">

              <ShieldCheck className="text-green-400" />

              <span className="text-gray-300">
                Blockchain Verification
              </span>

            </div>

            <div className="flex items-center gap-3">

              <ShieldCheck className="text-green-400" />

              <span className="text-gray-300">
                Trusted Recruiters
              </span>

            </div>

          </div>

        </div>

        {/* Right Side */}

        <div className="bg-[#111827] border border-gray-800 rounded-3xl p-8 shadow-2xl">

          <h3 className="text-2xl font-bold mb-8">
            AI Detection Dashboard
          </h3>

          <div className="space-y-6">

            <div className="flex justify-between border-b border-gray-800 pb-4">
              <span className="text-gray-400">
                Fake Jobs Detected
              </span>

              <span className="text-red-400 font-bold text-xl">
                317
              </span>
            </div>

            <div className="flex justify-between border-b border-gray-800 pb-4">
              <span className="text-gray-400">
                Recruiters Verified
              </span>

              <span className="text-green-400 font-bold text-xl">
                5,692
              </span>
            </div>

            <div className="flex justify-between border-b border-gray-800 pb-4">
              <span className="text-gray-400">
                Offer Letters Checked
              </span>

              <span className="text-blue-400 font-bold text-xl">
                2,148
              </span>
            </div>

            <div className="flex justify-between">

              <span className="text-gray-400">
                AI Accuracy
              </span>

              <span className="text-violet-400 font-bold text-xl">
                99.8%
              </span>

            </div>

          </div>

          <div className="mt-10">

            <div className="flex justify-between mb-3">

              <span className="text-gray-300">
                Threat Detection
              </span>

              <span className="text-violet-400 font-bold">
                98%
              </span>

            </div>

            <div className="w-full bg-gray-700 rounded-full h-3">

              <div className="w-[98%] bg-gradient-to-r from-violet-500 to-fuchsia-500 h-3 rounded-full"></div>

            </div>

          </div>

        </div>

      </div>

      {/* Statistics */}

      <div className="max-w-7xl mx-auto px-6 mt-24">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

          {[
            ["50K+", "Jobs Verified"],
            ["99.8%", "Detection Accuracy"],
            ["10K+", "Recruiters Verified"],
            ["24/7", "AI Protection"],
          ].map(([value, label]) => (

            <div
              key={label}
              className="bg-[#111827] border border-gray-800 rounded-2xl p-8 text-center hover:border-violet-500 transition-all duration-300 hover:-translate-y-2"
            >

              <h2 className="text-4xl font-extrabold text-violet-400">
                {value}
              </h2>

              <p className="text-gray-400 mt-3 text-lg">
                {label}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Hero;