import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#050816]/80 backdrop-blur-xl border-b border-gray-800 shadow-lg">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-8 h-20">

        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-3 group"
        >

          <div className="w-11 h-11 rounded-xl bg-violet-600 flex items-center justify-center group-hover:rotate-6 transition duration-300">

            <ShieldCheck
              size={24}
              className="text-white"
            />

          </div>

          <div>

            <h1 className="text-2xl font-bold tracking-tight text-white">
              JobShield
              <span className="text-violet-500">
                {" "}AI
              </span>
            </h1>

            <p className="text-xs text-gray-500">
              Secure Hiring Platform
            </p>

          </div>

        </Link>

        {/* Navigation */}

        <nav className="hidden lg:flex items-center gap-10">

          <a
            href="#"
            className="relative text-gray-300 hover:text-violet-400 transition duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-violet-500 after:transition-all hover:after:w-full"
          >
            Home
          </a>

          <a
            href="#features"
            className="relative text-gray-300 hover:text-violet-400 transition duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-violet-500 after:transition-all hover:after:w-full"
          >
            Features
          </a>

          <a
            href="#dashboard"
            className="relative text-gray-300 hover:text-violet-400 transition duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-violet-500 after:transition-all hover:after:w-full"
          >
            Dashboard
          </a>

          <a
            href="#how"
            className="relative text-gray-300 hover:text-violet-400 transition duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-violet-500 after:transition-all hover:after:w-full"
          >
            How It Works
          </a>

          <a
            href="#faq"
            className="relative text-gray-300 hover:text-violet-400 transition duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-violet-500 after:transition-all hover:after:w-full"
          >
            FAQ
          </a>

        </nav>

        {/* Right Buttons */}

        <div className="flex items-center gap-4">

          <Link to="/login">

            <button className="px-6 py-2.5 rounded-xl border border-violet-500 text-violet-400 font-medium hover:bg-violet-500 hover:text-white transition-all duration-300">

              Sign In

            </button>

          </Link>

          <Link to="/register">

            <button className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold shadow-lg hover:shadow-violet-500/30 transition-all duration-300 hover:scale-105">

              Get Started

            </button>

          </Link>

        </div>

      </div>

    </header>
  );
}

export default Navbar;