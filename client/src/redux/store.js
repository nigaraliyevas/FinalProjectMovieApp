// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./slices/showSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
  },
});
export default store; // <-- Add this line to export the store as default
