import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { clearError, register } from "./authSlice";

export default function Register() {
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [registerValue, setRegisterValue] = useState({
    username: "", email: "", password: "", confirmPassword: "",
  });
  const { username, email, password, confirmPassword } = registerValue;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterValue({ ...registerValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!username || !email || !password || !confirmPassword) {
      return toast.error("Please fill in all fields.");
    } else if (!passwordRegex.test(password)) {
      return toast.error("Password must have 8+ chars with uppercase, lowercase, number and special character.");
    } else if (password !== confirmPassword) {
      return toast.error("Passwords do not match.");
    } else {
      dispatch(register({ registerValue, toast, navigate }));
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
          <h1 className="font-serif text-3xl font-bold text-stone-800 mb-2">Start Your Journey</h1>
          <p className="text-stone-500 text-sm">Create an account and begin logging your travels</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-stone-700 font-medium text-sm mb-1.5">Username</label>
            <input type="text" id="username" name="username"
              className="w-full px-4 py-2.5 border border-stone-300 rounded-lg text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
              value={username} onChange={handleChange} placeholder="traveler_name" required />
          </div>
          <div>
            <label htmlFor="email" className="block text-stone-700 font-medium text-sm mb-1.5">Email</label>
            <input type="email" id="email" name="email"
              className="w-full px-4 py-2.5 border border-stone-300 rounded-lg text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
              value={email} onChange={handleChange} placeholder="you@example.com" required />
          </div>
          <div>
            <label htmlFor="password" className="block text-stone-700 font-medium text-sm mb-1.5">Password</label>
            <div className="relative flex items-center">
              <input type={showPassword ? "text" : "password"} id="password" name="password"
                className="w-full px-4 py-2.5 border border-stone-300 rounded-lg text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition pr-10"
                value={password} onChange={handleChange} placeholder="••••••••" required />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-stone-400 hover:text-stone-600 transition">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-stone-700 font-medium text-sm mb-1.5">Confirm Password</label>
            <div className="relative flex items-center">
              <input type={showConfirmPassword ? "text" : "password"} id="confirmPassword" name="confirmPassword"
                className="w-full px-4 py-2.5 border border-stone-300 rounded-lg text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition pr-10"
                value={confirmPassword} onChange={handleChange} placeholder="••••••••" required />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 text-stone-400 hover:text-stone-600 transition">
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 hover:shadow-md mt-2">
            {loading ? "Creating account…" : "Create Account"}
          </button>
        </form>
        <p className="text-center text-stone-500 text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-amber-600 font-medium hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};
