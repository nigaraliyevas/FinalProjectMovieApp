import { Route, Routes } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import Error404Page from "../pages/Error404Page/Error404Page";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import MoviesPage from "../pages/MoviesPage/MoviesPage";
import MovieUpdatePage from "../pages/MovieUpdatePage/MovieUpdatePage";
import MovieDetailPage from "../pages/MovieDetailPage/MovieDetailPage";

const MainRoutes = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movie/:id/" element={<MovieDetailPage />} />
        <Route path="/movie/:id/update" element={<MovieUpdatePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </MainLayout>
  );
};

export default MainRoutes;
