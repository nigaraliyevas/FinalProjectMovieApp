import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import MoviesAndFilter from "../../components/MoviesAndFilter/MoviesAndFilter";

const MoviesPage = () => {
  return (
    <>
      <BreadCrumb location="Tv Shows" />
      <MoviesAndFilter />
    </>
  );
};

export default MoviesPage;
