import {
  ShieldCheck,
  ExternalLink,
  Mail,
  ArrowUpRight,
} from "lucide-react";

function Footer() {
  return (
    <footer className="bg-[#050816] border-t border-gray-800 pt-20 pb-10">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-4 gap-12">

          {/* Logo */}
          <div>

            <div className="flex items-center gap-3 mb-6">

              <ShieldCheck
                className="text-violet-500"
                size={32}
              />

              <h2 className="text-3xl font-bold text-white">
                JobShield AI
              </h2>

            </div>

            <p className="text-gray-400 leading-8">
              Protecting millions of job seekers from fake recruiters,
              fraudulent job postings, and forged offer letters using
              Artificial Intelligence and Blockchain.
            </p>

          </div>

          {/* Platform */}

          <div>

            <h3 className="text-xl font-semibold text-white mb-6">
              Platform
            </h3>

            <ul className="space-y-4 text-gray-400">

              <li className="hover:text-violet-400 cursor-pointer">
                Dashboard
              </li>

              <li className="hover:text-violet-400 cursor-pointer">
                Verify Job
              </li>

              <li className="hover:text-violet-400 cursor-pointer">
                Recruiter Check
              </li>

              <li className="hover:text-violet-400 cursor-pointer">
                Offer Letter Scan
              </li>

            </ul>

          </div>

          {/* Resources */}

          <div>

            <h3 className="text-xl font-semibold text-white mb-6">
              Resources
            </h3>

            <ul className="space-y-4 text-gray-400">

              <li className="hover:text-violet-400 cursor-pointer">
                Documentation
              </li>

              <li className="hover:text-violet-400 cursor-pointer">
                API
              </li>

              <li className="hover:text-violet-400 cursor-pointer">
                Privacy Policy
              </li>

              <li className="hover:text-violet-400 cursor-pointer">
                Terms & Conditions
              </li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-xl font-semibold text-white mb-6">
              Connect
            </h3>

            <div className="space-y-5">

              <div className="flex items-center gap-3 text-gray-400 hover:text-violet-400 cursor-pointer">

                <Mail size={20} />

                support@jobshield.ai

              </div>

              <div className="flex items-center gap-3 text-gray-400 hover:text-violet-400 cursor-pointer">

                <ExternalLink size={20} />

                GitHub

                <ArrowUpRight size={16} />

              </div>

              <div className="flex items-center gap-3 text-gray-400 hover:text-violet-400 cursor-pointer">

                <ExternalLink size={20} />

                LinkedIn

                <ArrowUpRight size={16} />

              </div>

            </div>

          </div>

        </div>

        {/* Bottom Line */}

        <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">

          <p className="text-gray-500 text-center md:text-left">
            © 2026 JobShield AI. All Rights Reserved.
          </p>

          <p className="text-gray-500 mt-4 md:mt-0">
            Built with ❤️ for safer online hiring.
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;