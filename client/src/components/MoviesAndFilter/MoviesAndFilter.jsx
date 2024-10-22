import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm, faFilter, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./MoviesAndFilter.css";
import MovieCard from "../MovieCard/MovieCard";

// APIs
import { useListMoviesQuery, useSearchMoviesQuery, useGetMoviesByGenreQuery, useFilterByYearQuery, useCustomFilterQuery, useFreeMoviesQuery } from "../../features/movies/moviesApi";
import { useGetGenresQuery } from "../../features/genres/genresApi";
import { useGetLanguagesQuery } from "../../features/languages/languageApi";

const MoviesAndFilter = ({ location }) => {
  const currentYear = new Date().getFullYear();
  const startDate = 1934;
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedByGenre, setSelectedByGenre] = useState("");

  useEffect(() => {
    if (selectedGenre || selectedYear || selectedLanguage || selectedByGenre) {
      setSearchTerm("");
    }
  }, [selectedGenre, selectedYear, selectedLanguage, selectedByGenre]);

  const { data: moviesData, error: moviesError, isLoading: moviesLoading } = useListMoviesQuery({ page: currentPage, pageSize });
  const { data: freeMoviesData, error: freeMoviesError, isLoading: freeMoviesLoading } = useFreeMoviesQuery({ page: currentPage, pageSize });

  const { data: searchedMovies, refetch: searchMovies } = useSearchMoviesQuery({ name: searchTerm, page: currentPage, pageSize }, { skip: !searchTerm });

  const { data: genreMovies, error: genreMoviesError, isLoading: genreMoviesLoading } = useGetMoviesByGenreQuery({ name: selectedByGenre, pageSize, page: currentPage }, { skip: !selectedByGenre });

  const { data: yearMovies, refetch: filterByYear } = useFilterByYearQuery({ year: selectedYear, pageSize, page: currentPage }, { skip: !selectedYear });

  const { data: customFilteredMovies, error: customFilterError, isLoading: customFilterLoading } = useCustomFilterQuery({ year: selectedYear, genre: selectedGenre, language: selectedLanguage, page: currentPage, pageSize }, { skip: !(selectedGenre || selectedYear || selectedLanguage) });

  const { data: genresData } = useGetGenresQuery();
  const { data: languagesData } = useGetLanguagesQuery();

  if (moviesLoading || customFilterLoading || freeMoviesLoading) {
    return <p>Loading movies...</p>;
  }

  if (moviesError || customFilterError || freeMoviesError) {
    return <p>Error loading movies.</p>;
  }
  const yearElements = [];
  for (let i = currentYear; i >= startDate; i--) {
    yearElements.push(
      <button key={i} className="year-item" onClick={() => setSelectedYear(i)}>
        {i}
      </button>
    );
  }

  const handleSearch = e => {
    e.preventDefault();
    setSearchTerm(e.target.search.value);
    setSelectedGenre("");
    setSelectedYear(null);
    setSelectedLanguage("");
    setSelectedByGenre("");
  };

  const handleFilter = e => {
    e.preventDefault();
    const year = e.target.year.value;
    const language = e.target.language.value;
    const genre = e.target.genre.value;

    setSelectedYear(year);
    setSelectedLanguage(language);
    setSelectedGenre(genre);
    setSearchTerm("");
    setSelectedByGenre("");
  };

  const handleGenreClick = genre => {
    setSelectedByGenre(genre);
    setSelectedGenre("");
    setSelectedYear(null);
    setSelectedLanguage("");
    setSearchTerm("");
  };

  const handleNextPage = () => {
    setCurrentPage(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handlePreviousPage = () => {
    setCurrentPage(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  let displayedMovies;
  if (searchTerm) {
    displayedMovies = searchedMovies;
  } else if (selectedByGenre) {
    displayedMovies = genreMovies;
  } else if (selectedGenre || selectedYear || selectedLanguage) {
    displayedMovies = customFilteredMovies;
  } else if (location == "Movies") {
    displayedMovies = moviesData;
  } else {
    displayedMovies = freeMoviesData;
  }
  console.log(displayedMovies);
  return (
    <div className="custom-container-lg">
      <div className="row">
        <div className="col-lg-8 col-xl-9">
          <section className="cards">
            <div className="d-flex flex-wrap gap-4">
              {displayedMovies?.items.map(item => (
                <div className="col-lg-3 col-md-2" key={item.id}>
                  <MovieCard id={item.id} title={item.name} duration={item.duration} genres={item.genres} imgSrc={item.thumbImgURL} isFree={item.isFree} width={"290px"} />
                </div>
              ))}
            </div>
          </section>

          <div className="pagination mt-5">
            <button className="btn btn-primary me-3" disabled={currentPage === 1} onClick={handlePreviousPage}>
              Previous
            </button>
            <button className="btn btn-primary" disabled={moviesData && currentPage >= Math.ceil(displayedMovies?.totalCount / pageSize)} onClick={handleNextPage}>
              Next
            </button>
          </div>
        </div>

        <div className="col-lg-4 col-xl-3">
          <section className="search">
            <div className="search-container">
              <div className="search-box">
                <form className="search-form" onSubmit={handleSearch}>
                  <input name="search" type="text" className="search-form__input" placeholder="Search..." />
                  <button type="submit" className="search-form__submit">
                    <FontAwesomeIcon icon={faMagnifyingGlass} color="#fff" />
                  </button>
                </form>
              </div>
            </div>
          </section>

          <section className="custom-filter">
            <div className="custom-filter-container">
              <div className="custom-filter-box">
                <form className="custom-filter-form" onSubmit={handleFilter}>
                  <div className="mb-3">
                    <select name="genre" defaultValue="">
                      <option value="" disabled>
                        Genre
                      </option>
                      {genresData?.map(genre => (
                        <option key={genre.id} value={genre.name}>
                          {genre.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <select name="language" defaultValue="">
                      <option value="" disabled>
                        Language
                      </option>
                      {languagesData?.map(language => (
                        <option key={language.id} value={language.name}>
                          {language.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <input name="year" type="number" placeholder="Year" className="w-100 p-2 mb-3" />
                  </div>

                  <button type="submit" className="d-block w-100 custom-filter__btn">
                    <FontAwesomeIcon icon={faFilter} color="#fff" className="me-2" />
                    Filter
                  </button>
                </form>
              </div>
            </div>
          </section>

          <section className="genres">
            <div className="genres-container">
              <div className="genres-box">
                <h2 className="genres-box__header">Filter By Genre</h2>
                <div>
                  <ul className="genres-box__list list-unstyled">
                    {genresData?.map(genre => (
                      <li className="genres-box__item my-2" key={genre.id}>
                        <FontAwesomeIcon icon={faFilm} className="me-3" color="#fff" />
                        <button className="genres-box__name" onClick={() => handleGenreClick(genre.name)}>
                          {genre.name} ({genre.countMovies})
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="years">
            <div className="filter-by-year-container">
              <h2 className="filter-by-year-container__header">Filter By Year</h2>
              <div className="years-box">
                <div className="year-grid">{yearElements}</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MoviesAndFilter;
