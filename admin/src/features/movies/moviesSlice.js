// src/store/slices/modalSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
};

const modalSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovies(state, action) {
      state.movies = action.payload;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
