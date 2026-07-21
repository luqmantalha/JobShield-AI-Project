import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Aarav K.",
    role: "Software Engineer",
    review:
      "JobShield AI detected a fraudulent recruiter before I shared my personal details. The AI analysis was quick and incredibly helpful.",
  },
  {
    name: "Sneha R.",
    role: "HR Manager",
    review:
      "The recruiter verification feature improves trust in the hiring process. It's simple, fast, and gives confidence to both companies and candidates.",
  },
  {
    name: "Rohan M.",
    role: "Job Seeker",
    review:
      "The offer letter verification and company trust score helped me avoid a scam. I finally felt confident accepting my job offer.",
  },
];

function Testimonials() {
  return (
    <section className="bg-[#050816] py-32">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center mb-20">

          <span className="inline-block px-5 py-2 rounded-full bg-violet-500/10 border border-violet-500 text-violet-400 text-sm font-semibold mb-6">
            USER FEEDBACK
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
            Trusted by Job Seekers
          </h2>

          <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-400 leading-8">
            Hear how JobShield AI helps users identify recruitment scams,
            verify recruiters, and apply for jobs with confidence.
          </p>

        </div>

        {/* Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

          {testimonials.map((user, index) => (

            <div
              key={index}
              className="bg-[#111827] border border-gray-800 rounded-3xl p-8 transition-all duration-300 hover:border-violet-500 hover:-translate-y-2 hover:shadow-2xl"
            >

              {/* Stars */}

              <div className="flex gap-1 mb-6">

                {[1, 2, 3, 4, 5].map((star) => (

                  <Star
                    key={star}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />

                ))}

              </div>

              {/* Review */}

              <p className="text-gray-300 text-lg leading-8 italic mb-8">
                "{user.review}"
              </p>

              {/* User */}

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-full bg-violet-600 flex items-center justify-center text-white text-xl font-bold">

                  {user.name.charAt(0)}

                </div>

                <div>

                  <h3 className="text-xl font-semibold text-white">
                    {user.name}
                  </h3>

                  <p className="text-violet-400">
                    {user.role}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Testimonials;