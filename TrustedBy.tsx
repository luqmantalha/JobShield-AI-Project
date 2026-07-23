import {
  Brain,
  ShieldCheck,
  Database,
  Cloud,
  Blocks,
  Cpu,
} from "lucide-react";

const technologies = [
  {
    icon: Brain,
    title: "Artificial Intelligence",
  },
  {
    icon: ShieldCheck,
    title: "Machine Learning",
  },
  {
    icon: Blocks,
    title: "Blockchain",
  },
  {
    icon: Database,
    title: "Cloud Database",
  },
  {
    icon: Cloud,
    title: "Cloud Computing",
  },
  {
    icon: Cpu,
    title: "Real-Time Analytics",
  },
];

function TrustedBy() {
  return (
    <section className="bg-[#08101f] py-32">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center mb-20">

          <span className="inline-block px-5 py-2 rounded-full bg-violet-500/10 border border-violet-500 text-violet-400 text-sm font-semibold mb-6">
            POWERED BY
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">

            Built With Modern Technologies

          </h2>

          <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-400 leading-8">

            JobShield AI combines Artificial Intelligence,
            Blockchain, Cloud Computing, and Real-Time Analytics
            to build a secure hiring ecosystem.

          </p>

        </div>

        {/* Cards */}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">

          {technologies.map((tech, index) => {

            const Icon = tech.icon;

            return (

              <div
                key={index}
                className="group bg-[#111827] border border-gray-800 rounded-3xl p-8 text-center hover:border-violet-500 hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
              >

                <div className="w-16 h-16 mx-auto rounded-2xl bg-violet-500/10 flex items-center justify-center mb-6 group-hover:bg-violet-600 transition">

                  <Icon
                    size={34}
                    className="text-violet-400 group-hover:text-white"
                  />

                </div>

                <h3 className="text-white font-semibold leading-7">

                  {tech.title}

                </h3>

              </div>

            );

          })}

        </div>

      </div>

    </section>
  );
}

export default TrustedBy;