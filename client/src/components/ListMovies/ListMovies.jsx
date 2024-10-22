import { Link } from "react-router-dom";
import MovieCard from "../MovieCard/MovieCard";
import { useListMoviesQuery } from "../../features/movies/moviesApi";
import { useState } from "react";

const ListMovies = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;
  const { data, error, isLoading } = useListMoviesQuery({ page: currentPage, pageSize });

  if (isLoading) return <p>Loading movies...</p>;
  if (error) return <p>Error fetching movies: {error.message}</p>;

  function getTime(time) {
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours != 0 ? hours + " h" : ""} ${minutes} mins`;
  }

  return (
    <>
      <section className="cards">
        <div className="d-flex flex-wrap gap-4">
          {data?.items.map(item => (
            <div className="col-lg-3 col-md-2" key={item.id}>
              <Link to={`/movie/${item.id}`}>
                <MovieCard id={item.id} title={item.name} duration={getTime(item.duration)} genre={item.genres?.map(genre => genre.name + " ")} imgSrc={item.thumbImgURL} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <div className="pagination mt-5">
        <button className="btn btn-primary me-3" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>
          Previous
        </button>
        <button className="btn btn-primary" disabled={data && currentPage >= Math.ceil(data.totalCount / pageSize)} onClick={() => setCurrentPage(prev => prev + 1)}>
          Next
        </button>
      </div>
    </>
  );
};

export default ListMovies;
