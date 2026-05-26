import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setLogout } from "../features/auth/authSlice";

export default function Header({ isAuthenticated, user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/");
    toast.success("Logged out successfully!");
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-amber-500 font-semibold text-sm"
      : "text-stone-600 hover:text-amber-500 font-medium text-sm transition-colors duration-200";

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-stone-200 shadow-sm fixed top-0 w-full z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="font-serif text-2xl font-bold text-stone-800 tracking-tight hover:text-amber-600 transition-colors duration-200"
        >
          Roaming Memoirs
        </Link>

        {isAuthenticated ? (
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-5">
              <NavLink to="/all/logs" className={navLinkClass}>My Logs</NavLink>
              <NavLink to="/add/logs" className={navLinkClass}>Add Trip</NavLink>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-stone-500 text-sm font-medium hidden sm:block">
                {user?.username}
              </span>
              <button
                onClick={handleLogout}
                className="bg-stone-800 hover:bg-stone-700 text-white text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 hover:shadow-md"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link to="/login"
              className="text-stone-700 hover:text-amber-600 font-medium text-sm transition-colors duration-200">
              Sign In
            </Link>
            <Link to="/register"
              className="bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200 hover:shadow-md">
              Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
