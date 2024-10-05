import CustomFilter from "../CustomFilter/CustomFilter";
import FilterByYear from "../FilterByYear/FilterByYear";
import GenreFilter from "../GenreFilter/GenreFilter";
import ListMovies from "../ListMovies/ListMovies";
import Pagination from "../Pagination/Pagination";
import Search from "../Search/Search";

const MoviesAndFilter = () => {
  return (
    <>
      <div className="custom-container-lg">
        <div className="row ">
          <div className="col-lg-8 col-xl-9">
            <ListMovies />
            {/* <Pagination /> */}
          </div>
          <div className="col-lg-4 col-xl-3">
            <Search />
            <CustomFilter />
            <GenreFilter />
            <FilterByYear />
          </div>
        </div>
      </div>
    </>
  );
};

export default MoviesAndFilter;
