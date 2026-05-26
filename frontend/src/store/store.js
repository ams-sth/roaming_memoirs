import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import logSlice from "../features/logs/logSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    log: logSlice,
  },
});
