// src/store/slices/modalSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showModal: false,
  videoUrl: ''
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.showModal = true;
      state.videoUrl = action.payload;
    },
    closeModal: (state) => {
      state.showModal = false;
      state.videoUrl = '';
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
