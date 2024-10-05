import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: 1,
  totalPages: 10,
  itemsPerPage: 15,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
    },
    resetPagination: state => {
      state.currentPage = 1;
      state.totalPages = 1;
    },
  },
});

export const { setPage, setTotalPages, setItemsPerPage, resetPagination } = paginationSlice.actions;

export default paginationSlice.reducer;
