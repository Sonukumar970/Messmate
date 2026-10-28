import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-6xl font-black text-green-700">404</p>

      <h1 className="mt-4 text-2xl font-bold text-gray-900">
        Page not found
      </h1>

      <p className="mt-2 text-sm text-gray-500">
        The page you're looking for doesn't exist.
      </p>

      <Link
        to="/dashboard"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-700 px-5 py-3 text-sm font-semibold text-white hover:bg-green-800"
      >
        <ArrowLeft size={17} />
        Back to Dashboard
      </Link>
    </div>
  );
}