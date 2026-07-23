import {
  Upload,
  BrainCircuit,
  ShieldCheck,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Job",
    description:
      "Paste a job URL or upload an offer letter. JobShield AI securely collects the required information for analysis.",
  },
  {
    icon: BrainCircuit,
    title: "AI Analysis",
    description:
      "Our AI examines recruiter identity, company legitimacy, salary patterns, suspicious language, and historical scam records.",
  },
  {
    icon: ShieldCheck,
    title: "Blockchain Verification",
    description:
      "Verified recruiter identities and offer letters are stored securely using blockchain for complete transparency.",
  },
  {
    icon: BadgeCheck,
    title: "Trust Score",
    description:
      "Receive a detailed AI-generated trust score with scam probability, recommendations, and safety insights.",
  },
];

function HowItWorks() {
  return (
    <section className="bg-[#08101f] py-32">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center mb-20">

          <span className="inline-block px-5 py-2 rounded-full bg-violet-500/10 border border-violet-500 text-violet-400 text-sm font-semibold mb-6">
            SIMPLE WORKFLOW
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
            How JobShield AI Works
          </h2>

          <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-400 leading-8">
            Protect yourself from fake jobs in four simple steps using
            Artificial Intelligence and Blockchain verification.
          </p>

        </div>

        {/* Steps */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {steps.map((step, index) => {

            const Icon = step.icon;

            return (

              <div
                key={index}
                className="relative bg-[#111827] border border-gray-800 rounded-3xl p-8 transition-all duration-300 hover:border-violet-500 hover:-translate-y-2 hover:shadow-2xl group"
              >

                {/* Step Number */}

                <div className="absolute -top-5 left-8 w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center text-white font-bold shadow-lg">

                  {index + 1}

                </div>

                {/* Icon */}

                <div className="w-20 h-20 rounded-2xl bg-violet-500/10 flex items-center justify-center mb-8 group-hover:bg-violet-600 transition">

                  <Icon
                    size={38}
                    className="text-violet-400 group-hover:text-white"
                  />

                </div>

                {/* Title */}

                <h3 className="text-2xl font-bold text-white mb-5">

                  {step.title}

                </h3>

                {/* Description */}

                <p className="text-gray-400 text-lg leading-8">

                  {step.description}

                </p>

                {/* Arrow (Desktop Only) */}

                {index !== steps.length - 1 && (
                  <ArrowRight
                    size={28}
                    className="hidden lg:block absolute -right-6 top-1/2 -translate-y-1/2 text-violet-500"
                  />
                )}

              </div>

            );

          })}

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;