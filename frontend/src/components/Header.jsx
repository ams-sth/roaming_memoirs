import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setLogout } from "../redux/features/authSlice";

const Header = ({ isAuthenticated, user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/");
    toast.success("Logout Successfully!");
  };

  const [activeState, setActiveState] = useState("addLogs");

  const handleActiveState = (parameter) => {
    setActiveState(parameter);

    localStorage.setItem("activeState", parameter);
  };

  useEffect(() => {
    const storedState = localStorage.getItem("activeState");
    if (storedState) {
      setActiveState(storedState);
    }
  }, []);

  return (
    <nav className="bg-white shadow-lg fixed top-0 w-full py-[0.5rem] flex items-center justify-between">
      {/* User Authentication */}
      <Link to="/" className="px-[3rem] text-2xl text-black">
        Roaming Memoirs
      </Link>
      {isAuthenticated ? (
        <div className="flex flex-row items-center justify-between px-[3rem]">
          <div className="flex gap-3">
            <NavLink
              id="allLogs"
              onClick={() => handleActiveState("allLogs")}
              to="/all/logs"
              className={
                activeState === "allLogs"
                  ? "text-orange-500 font-bold"
                  : " text-black font-semibold"
              }
            >
              View Logs
            </NavLink>
            <NavLink
              id="addLogs"
              onClick={() => handleActiveState("addLogs")}
              to="/add/logs"
              className={
                activeState === "addLogs"
                  ? "text-orange-500 font-bold"
                  : " text-black font-semibold"
              }
            >
              Add Log
            </NavLink>
          </div>
          <div className="flex items-center space-x-3 justify-center">
            <Link to="/" className="text-white hover:underline">
              {user?.username}
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-[1rem] py-[.5rem] rounded-xl text-white hover:scale-105 duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="px-[3rem] flex justify-end space-x-3">
          <Link
            to="/login"
            className="bg-green-500 px-[1rem] py-[.5em] rounded-xl text-white hover:scale-105 duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-blue-500 px-[1rem] py-[.5em] rounded-xl text-white hover:scale-105 duration-300"
          >
            Signup
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Header;
