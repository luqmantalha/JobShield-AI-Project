import {
  Search,
  ShieldCheck,
  FileSearch,
  BadgeCheck,
  Brain,
  Lock,
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "AI Fake Job Detection",
    desc: "Detect fraudulent job postings using advanced Machine Learning models trained on real-world scam patterns.",
  },
  {
    icon: ShieldCheck,
    title: "Recruiter Verification",
    desc: "Verify recruiters through company databases, digital identities, and trusted organizational records.",
  },
  {
    icon: FileSearch,
    title: "Offer Letter Validation",
    desc: "Upload offer letters and let AI identify forged documents, fake signatures, and suspicious content.",
  },
  {
    icon: BadgeCheck,
    title: "Company Trust Score",
    desc: "Every recruiter and company receives an AI-generated credibility score based on multiple verification factors.",
  },
  {
    icon: Brain,
    title: "AI Risk Prediction",
    desc: "Predict recruitment scams before candidates apply using intelligent behavioral analysis.",
  },
  {
    icon: Lock,
    title: "Blockchain Verification",
    desc: "Store recruiter verification and offer letter records securely using blockchain technology.",
  },
];

function Features() {
  return (
    <section className="bg-[#08101f] py-32">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-20">

          <span className="inline-block px-5 py-2 rounded-full bg-violet-500/10 border border-violet-500 text-violet-400 text-sm font-semibold mb-6">
            PLATFORM FEATURES
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
            Everything You Need to Stay
            <span className="text-violet-500"> Safe Online</span>
          </h2>

          <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-400 leading-8">
            JobShield AI combines Artificial Intelligence, Blockchain,
            and Digital Identity Verification to protect job seekers
            from fake recruiters, fraudulent job postings, and forged
            offer letters.
          </p>

        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

          {features.map((item, index) => {

            const Icon = item.icon;

            return (

              <div
                key={index}
                className="group bg-[#111827] rounded-3xl border border-gray-800 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-violet-500 hover:shadow-2xl"
              >

                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-violet-500/10 flex items-center justify-center mb-8 group-hover:bg-violet-500 transition-all duration-300">

                  <Icon
                    size={34}
                    className="text-violet-500 group-hover:text-white"
                  />

                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-4 leading-snug">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-lg leading-8">
                  {item.desc}
                </p>

              </div>

            );

          })}

        </div>

      </div>
    </section>
  );
}

export default Features;