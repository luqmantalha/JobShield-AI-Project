import {
  ShieldCheck,
  Users,
  FileCheck,
  Brain,
} from "lucide-react";

const stats = [
  {
    icon: ShieldCheck,
    number: "99.8%",
    title: "Detection Accuracy",
    description:
      "Advanced AI models accurately identify fake job postings.",
  },
  {
    icon: Users,
    number: "50K+",
    title: "Verified Recruiters",
    description:
      "Recruiters validated through trusted company databases.",
  },
  {
    icon: FileCheck,
    number: "100K+",
    title: "Offer Letters Verified",
    description:
      "AI has successfully verified thousands of job offers.",
  },
  {
    icon: Brain,
    number: "24/7",
    title: "AI Protection",
    description:
      "Continuous monitoring keeps job seekers safe around the clock.",
  },
];

function Stats() {
  return (
    <section className="bg-[#050816] py-32">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center mb-20">

          <span className="inline-block rounded-full border border-violet-500 bg-violet-500/10 px-5 py-2 text-sm font-semibold text-violet-400 mb-6">
            TRUSTED WORLDWIDE
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
            Our Impact in Numbers
          </h2>

          <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-400 leading-8">
            JobShield AI continuously protects thousands of job seekers
            by combining Artificial Intelligence, Blockchain, and
            real-time fraud detection.
          </p>

        </div>

        {/* Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {stats.map((item, index) => {

            const Icon = item.icon;

            return (

              <div
                key={index}
                className="group bg-[#111827] border border-gray-800 rounded-3xl p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:border-violet-500 hover:shadow-2xl"
              >

                {/* Icon */}

                <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-violet-500/10 group-hover:bg-violet-600 transition-all duration-300">

                  <Icon
                    size={38}
                    className="text-violet-400 group-hover:text-white"
                  />

                </div>

                {/* Number */}

                <h2 className="text-5xl font-black text-white mb-4">

                  {item.number}

                </h2>

                {/* Title */}

                <h3 className="text-xl font-semibold text-white mb-4">

                  {item.title}

                </h3>

                {/* Description */}

                <p className="text-gray-400 leading-7">

                  {item.description}

                </p>

              </div>

            );

          })}

        </div>

      </div>
    </section>
  );
}

export default Stats;