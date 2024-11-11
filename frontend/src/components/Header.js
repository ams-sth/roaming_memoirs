import React from "react";
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
              to="/all/logs"
              className="text-yellow-500 hover:text-orange-500"
              activeClassName="text-white"
            >
              All Logs
            </NavLink>
            <NavLink
              to="/add/logs"
              className=" text-yellow-500 hover:text-orange-500"
              activeClassName="text-white"
            >
              Add Log
            </NavLink>
          </div>
          <div className="flex items-center space-x-3 justify-center">
            <Link to="/" className="text-white hover:underline">
              {user?.username}
            </Link>
            <button onClick={handleLogout} className="btn btn-danger btn-sm">
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="px-[3rem] flex justify-end space-x-3">
          <Link
            to="/login"
            className="bg-red-500 px-[1rem] py-[.5em] rounded-xl text-white hover:scale-105 duration-300"
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
