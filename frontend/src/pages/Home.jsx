import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    isAuthenticated ? navigate("/add/logs") : navigate("/login");
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <img
        src="/images/Background.jpg"
        alt="Travel background"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <p className="text-amber-300 text-sm font-medium tracking-widest uppercase mb-4">
          Your travel journal
        </p>
        <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-5 drop-shadow-lg leading-tight">
          Roaming Memoirs
        </h1>
        <p className="text-white/80 text-lg max-w-md mb-8 leading-relaxed">
          Capture every adventure, relive every moment, and share the stories only you can tell.
        </p>
        <button
          onClick={handleGetStarted}
          className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-amber-500/30"
        >
          {isAuthenticated ? "Add a Trip" : "Get Started"}
        </button>
      </div>
    </div>
  );
};
