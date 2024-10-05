import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import MoviesAndFilter from "../../components/MoviesAndFilter/MoviesAndFilter";

const MoviesPage = () => {
  return (
    <>
      <BreadCrumb location="Movies" />
      <MoviesAndFilter />
    </>
  );
};

export default MoviesPage;
