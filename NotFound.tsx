import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <h1 className="text-6xl font-extrabold mb-6">404</h1>
        <p className="text-gray-400 text-lg mb-8">
          The page you are looking for could not be found.
        </p>
        <Link
          to="/"
          className="inline-block bg-violet-600 hover:bg-violet-500 px-8 py-4 rounded-xl font-semibold transition"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
