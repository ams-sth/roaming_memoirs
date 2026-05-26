import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { clearError, login } from "./authSlice";

export default function Login() {
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginValue, setLoginValue] = useState({ email: "", password: "" });
  const { email, password } = loginValue;
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginValue({ ...loginValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(login({ loginValue, toast, navigate }));
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [dispatch, error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-100 to-amber-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-stone-100 p-8">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-bold text-stone-800 mb-2">Welcome Back</h1>
          <p className="text-stone-500 text-sm">Sign in to continue your journey</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-stone-700 font-medium text-sm mb-1.5">Email</label>
            <input
              type="email" id="email" name="email"
              className="w-full px-4 py-2.5 border border-stone-300 rounded-lg text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
              value={email} onChange={handleChange} placeholder="you@example.com" required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-stone-700 font-medium text-sm mb-1.5">Password</label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"} id="password" name="password"
                className="w-full px-4 py-2.5 border border-stone-300 rounded-lg text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition pr-10"
                value={password} onChange={handleChange} placeholder="••••••••" required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-stone-400 hover:text-stone-600 transition">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 hover:shadow-md">
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
        <p className="text-center text-stone-500 text-sm mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-amber-600 font-medium hover:underline">Create one</Link>
        </p>
      </div>
    </div>
  );
};
