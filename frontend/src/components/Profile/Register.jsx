import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearError, register } from "../../redux/features/authSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [registerValue, setRegisterValue] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { username, email, password, confirmPassword } = registerValue;
  const handleChange = (e) => {
    let { name, value } = e.target;
    setRegisterValue({ ...registerValue, [name]: value });
  };
  const handleSubmit = (e) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    e.preventDefault();
    if (!username || !email || !password || !confirmPassword) {
      return toast.error("please enter all fields!");
    } else if (!passwordRegex.test(password)) {
      return toast.error(
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
    } else if (password !== confirmPassword) {
      return toast.error("password must be match!");
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

  const [showpassword, setShowpassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePassword = () => {
    setShowpassword(!showpassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Create Your Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="userName"
              className="block text-gray-700 font-medium mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300"
              value={username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <div className="flex flex-row gap-3 items-center">
              <input
                type={showpassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300"
                value={password}
                onChange={handleChange}
              />
              {showpassword ? (
                <FaEyeSlash onClick={() => togglePassword("password")} />
              ) : (
                <FaEye onClick={() => togglePassword("password")} />
              )}
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Confirm Password
            </label>
            <div className="flex flex-row gap-3 items-center">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300"
                value={confirmPassword}
                onChange={handleChange}
              />
              {showConfirmPassword ? (
                <FaEyeSlash onClick={toggleConfirmPassword} />
              ) : (
                <FaEye onClick={toggleConfirmPassword} />
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 focus:ring focus:ring-indigo-300"
          >
            {loading && <span>Loading....</span>}Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
