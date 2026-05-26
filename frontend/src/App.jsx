import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import AddLog from "./features/logs/AddLog";
import Logs from "./features/logs/Logs";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { profile } from "./features/auth/authSlice";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(profile());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} user={user} />
      <ToastContainer position="bottom-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/add/logs"
          element={
            <ProtectedRoute>
              <AddLog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/all/logs"
          element={
            <ProtectedRoute>
              <Logs />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
