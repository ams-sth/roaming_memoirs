import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-stone-50 to-amber-50 px-4 text-center">
      <p className="text-amber-500 font-serif text-8xl font-bold mb-4">404</p>
      <h1 className="text-stone-800 text-2xl font-semibold mb-2">Page Not Found</h1>
      <p className="text-stone-500 mb-8 max-w-sm">
        Looks like this trail doesn't exist. Let's get you back on track.
      </p>
      <Link
        to="/"
        className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-2.5 rounded-full transition-all duration-200 hover:shadow-md"
      >
        Back to Home
      </Link>
    </div>
  );
};
