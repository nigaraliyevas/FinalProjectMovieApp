import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import MoviesAndFilter from "../../components/MoviesAndFilter/MoviesAndFilter";

const MoviesPage = () => {
  return (
    <>
      <BreadCrumb location="Free Movies" />
      <MoviesAndFilter location="Free Movies" />
    </>
  );
};

export default MoviesPage;
