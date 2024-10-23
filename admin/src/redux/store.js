// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./slices/showSlice";
import { genresApi } from "../features/genres/genresApi";
import { movieApi } from "../features/movies/moviesApi";
import { languageApi } from "../features/languages/languageApi";
import { authApi } from "../features/auth/authApi";
import { planApi } from "../features/plans/plansApi";
import { commentApi } from "../features/comments/commentApi";
import { actorsApi } from "../features/actors/actorsApi";
import { tagsApi } from "../features/tags/tagsApi";
import { countriesApi } from "../features/countries/countriesApi";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    [genresApi.reducerPath]: genresApi.reducer,
    [movieApi.reducerPath]: movieApi.reducer,
    [languageApi.reducerPath]: languageApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [planApi.reducerPath]: planApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [actorsApi.reducerPath]: actorsApi.reducer,
    [tagsApi.reducerPath]: tagsApi.reducer,
    [countriesApi.reducerPath]: countriesApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(genresApi.middleware, movieApi.middleware, languageApi.middleware, authApi.middleware, planApi.middleware, commentApi.middleware, actorsApi.middleware, tagsApi.middleware,countriesApi.middleware),
});
export default store;
