// import { createSlice } from '@reduxjs/toolkit';
// import { authApi } from './authApi';

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     user: null,
//     token: null,
//     plan: null,
//   },
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       state.plan = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addMatcher(
//       authApi.endpoints.login.matchFulfilled,
//       (state, { payload }) => {
//         state.user = payload.user;
//         state.token = payload.token;
//         state.plan = payload.plan;
//       }
//     );
//     builder.addMatcher(
//       authApi.endpoints.getProfile.matchFulfilled,
//       (state, { payload }) => {
//         state.user = payload.user;
//         state.plan = payload.plan;
//       }
//     );
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;
