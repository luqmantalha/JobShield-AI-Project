import { ChevronRight } from "lucide-react";

const faqs = [
  {
    question: "How does AI detect fake jobs?",
    answer:
      "Our AI analyzes recruiter identity, company domain, job descriptions, salary patterns, suspicious keywords, and scam databases to generate a trust score in seconds.",
  },
  {
    question: "Can I verify an offer letter?",
    answer:
      "Yes. Upload your offer letter and JobShield AI validates company details, recruiter information, document authenticity, and blockchain verification records.",
  },
  {
    question: "How is Blockchain used?",
    answer:
      "Verified recruiter identities and offer letters are securely stored using blockchain technology, making them tamper-proof and easily verifiable.",
  },
  {
    question: "Is JobShield AI free to use?",
    answer:
      "Yes. Basic job verification and recruiter checks are free. Premium features such as detailed AI reports and enterprise integrations are available separately.",
  },
];

function FAQ() {
  return (
    <section className="bg-[#08101f] py-32">
      <div className="max-w-5xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
            Frequently Asked Questions
          </h2>

          <p className="text-gray-400 text-lg md:text-xl leading-8 max-w-3xl mx-auto">
            Everything you need to know about JobShield AI and how it protects
            job seekers from recruitment fraud.
          </p>
        </div>

        {/* FAQ Cards */}
        <div className="space-y-8">

          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#111827] border border-gray-800 rounded-2xl p-8 transition-all duration-300 hover:border-violet-500 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-start gap-4">

                <div className="mt-1">
                  <ChevronRight
                    size={22}
                    className="text-violet-500"
                  />
                </div>

                <div>

                  <h3 className="text-2xl font-semibold text-white mb-4">
                    {faq.question}
                  </h3>

                  <p className="text-gray-400 text-lg leading-8">
                    {faq.answer}
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

export default FAQ;