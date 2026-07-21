import {
  ShieldCheck,
  AlertTriangle,
  BadgeCheck,
  FileCheck,
} from "lucide-react";

function DashboardPreview() {
  return (
    <section className="bg-[#050816] py-32">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
            AI Security Dashboard
          </h2>

          <p className="text-gray-400 text-lg md:text-xl leading-8 max-w-3xl mx-auto">
            Monitor recruiter trust, detect scams, and verify jobs in real
            time with real-time AI insights.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Verification Summary */}
          <div className="bg-[#111827] rounded-3xl border border-gray-800 p-10 shadow-xl transition-all duration-300 hover:border-violet-500 hover:-translate-y-1">

            <div className="flex items-center gap-4 mb-8">
              <ShieldCheck
                className="text-green-400"
                size={34}
              />

              <h3 className="text-3xl font-bold text-white">
                AI Verification Summary
              </h3>
            </div>

            <div className="space-y-6">

              <div className="flex justify-between items-center border-b border-gray-800 pb-4">
                <span className="text-gray-300 text-lg">
                  Jobs Verified
                </span>

                <span className="text-green-400 text-2xl font-bold">
                  1,248
                </span>
              </div>

              <div className="flex justify-between items-center border-b border-gray-800 pb-4">
                <span className="text-gray-300 text-lg">
                  Fake Jobs Blocked
                </span>

                <span className="text-red-400 text-2xl font-bold">
                  317
                </span>
              </div>

              <div className="flex justify-between items-center border-b border-gray-800 pb-4">
                <span className="text-gray-300 text-lg">
                  Verified Recruiters
                </span>

                <span className="text-blue-400 text-2xl font-bold">
                  5,692
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-lg">
                  AI Confidence
                </span>

                <span className="text-violet-400 text-2xl font-bold">
                  99.8%
                </span>
              </div>

            </div>

          </div>

          {/* Recent Activity */}
          <div className="bg-[#111827] rounded-3xl border border-gray-800 p-10 shadow-xl transition-all duration-300 hover:border-violet-500 hover:-translate-y-1">

            <h3 className="text-3xl font-bold text-white mb-8">
              Recent Activity
            </h3>

            <div className="space-y-8">

              <div className="flex items-start gap-5 border-b border-gray-800 pb-6">

                <AlertTriangle
                  className="text-red-500 mt-1"
                  size={28}
                />

                <div>
                  <h4 className="text-xl font-semibold text-white">
                    Fake Job Detected
                  </h4>

                  <p className="text-gray-400 leading-7 mt-2">
                    AI blocked a suspicious recruiter before users could apply.
                  </p>
                </div>

              </div>

              <div className="flex items-start gap-5 border-b border-gray-800 pb-6">

                <BadgeCheck
                  className="text-green-500 mt-1"
                  size={28}
                />

                <div>
                  <h4 className="text-xl font-semibold text-white">
                    Recruiter Verified
                  </h4>

                  <p className="text-gray-400 leading-7 mt-2">
                    Microsoft HR Team successfully verified through AI identity
                    validation.
                  </p>
                </div>

              </div>

              <div className="flex items-start gap-5">

                <FileCheck
                  className="text-blue-500 mt-1"
                  size={28}
                />

                <div>
                  <h4 className="text-xl font-semibold text-white">
                    Offer Letter Verified
                  </h4>

                  <p className="text-gray-400 leading-7 mt-2">
                    Blockchain verification completed and securely stored.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default DashboardPreview;