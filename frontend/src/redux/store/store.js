import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import logSlice from "../features/logSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    log: logSlice,
  },
});

