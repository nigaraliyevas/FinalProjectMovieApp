import { Route, Routes } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import HomePage from "../pages/HomePage/HomePage";
import ShowPage from "../pages/ShowPage/ShowPage";
import DetailPage from "../pages/DetailPage/DetailPage";
import MoviePage from "../pages/MoviePage/MoviePage";
import MoviesPage from "../pages/MoviesPage/MoviesPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RecoverPasswordPage from "../pages/RecoverPasswordPage/RecoverPasswordPage";
import TvShowsPage from "../pages/TvShowsPage/TvShowsPage";
import Error404Page from "../pages/Error404Page/Error404Page";
import PricingPlanPage from "../pages/PricingPlanPage/PricingPlanPage";

const MainRoutes = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/show" element={<ShowPage />} />
        {/* <Route path="/movie/:id" element={<DetailPage />} /> */}
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/Movie" element={<MoviesPage />} />
        <Route path="/free-movies" element={<TvShowsPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/recover" element={<RecoverPasswordPage />} />
        <Route path="/pricing-plan" element={<PricingPlanPage />} />
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </MainLayout>
  );
};

export default MainRoutes;
