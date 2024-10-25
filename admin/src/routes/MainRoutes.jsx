import { Route, Routes } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import Error404Page from "../pages/Error404Page/Error404Page";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import MoviesPage from "../pages/MoviesPage/MoviesPage";
import MovieUpdatePage from "../pages/MovieUpdatePage/MovieUpdatePage";
import MovieDetailPage from "../pages/MovieDetailPage/MovieDetailPage";
import CountriesList from "../components/Country/Country";
import MovieCreatePage from "../pages/MovieCreatePage/MovieCreatePage";
import CountryPage from "../pages/CountryPage/CountryPage";
import CountryUpdatePage from "../pages/CountryUpdatePage/CountryUpdatePage";
import CountryCreatePage from "../pages/CountryCreatePage/CountryCreatePage";
import GenrePage from "../pages/GenrePage/GenrePage";
import GenreCreatePage from "../pages/GenreCreatePage/GenreCreatePage";
import GenreUpdatePage from "../pages/GenreUpdatePage/GenreUpdatePage";
import TagPage from "../pages/TagPage/TagPage";
import TagCreatePage from "../pages/TagCreatePage/TagCreatePage";
import TagUpdatePage from "../pages/TagUpdatePage/TagUpdatePage";
import ActorPage from "../pages/ActorPage/ActorPage";
import ActorCreatePage from "../pages/ActorCreatePage/ActorCreatePage";
import ActorUpdatePage from "../pages/ActorUpdatePage/ActorUpdatePage";
import LanguagePage from "../pages/LanguagePage/LanguagePage";
import LanguageCreate from "../components/LanguageCreate/LanguageCreate";
import LanguageUpdatePage from "../pages/LanguageUpdatePage/LanguageUpdatePage";
import SubscriptionPlanPage from "../pages/SubscriptionPlanPage/SubscriptionPlanPage";
import SubscriptionPlanCreatePage from "../pages/SubscriptionPlanCreatePage/SubscriptionPlanCreatePage";
import SubscriptionPlanUpdatePage from "../pages/SubscriptionPlanUpdatePage/SubscriptionPlanUpdatePage";

const MainRoutes = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />

        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movie/:id/" element={<MovieDetailPage />} />
        <Route path="/movie/create" element={<MovieCreatePage />} />
        <Route path="/movie/:id/update" element={<MovieUpdatePage />} />

        <Route path="/countries" element={<CountryPage />} />
        <Route path="/countries/create" element={<CountryCreatePage />} />
        <Route path="/countries/update/:id" element={<CountryUpdatePage />} />

        <Route path="/genres" element={<GenrePage />} />
        <Route path="/genres/create" element={<GenreCreatePage />} />
        <Route path="/genres/update/:id" element={<GenreUpdatePage />} />

        <Route path="/tags" element={<TagPage />} />
        <Route path="/tags/create" element={<TagCreatePage />} />
        <Route path="/tags/update/:id" element={<TagUpdatePage />} />

        <Route path="/actors" element={<ActorPage />} />
        <Route path="/actors/create" element={<ActorCreatePage />} />
        <Route path="/actors/update/:id" element={<ActorUpdatePage />} />

        <Route path="/languages" element={<LanguagePage />} />
        <Route path="/languages/create" element={<LanguageCreate />} />
        <Route path="/languages/update/:id" element={<LanguageUpdatePage />} />

        <Route path="/plans" element={<SubscriptionPlanPage />} />
        <Route path="/plans/create" element={<SubscriptionPlanCreatePage />} />
        <Route path="/plans/update/:id" element={<SubscriptionPlanUpdatePage />} />

        {/* <Route path="/countries" element={<CountriesList />} /> */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </MainLayout>
  );
};

export default MainRoutes;
