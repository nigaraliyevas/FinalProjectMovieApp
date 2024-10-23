import { useNavigate } from "react-router-dom"; 
import { useListMoviesQuery, useDeleteMovieMutation } from "../../features/movies/moviesApi"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import "./Movies.css";
import { useState, useEffect } from "react";

const Movies = () => {
  const [page, setPage] = useState(1); 
  const pageSize = 10; 
  const { data, isLoading, error } = useListMoviesQuery({ page, pageSize });
  const [deleteMovie] = useDeleteMovieMutation(); 
  const navigate = useNavigate(); 

  const [movies, setMovies] = useState([]); 

  useEffect(() => {
    if (data && data.items) {
      setMovies(data.items);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading movies</div>;

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (data && data.items.length === pageSize) {
      setPage(page + 1);
    }
  };

  const handleDelete = async id => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      try {
        await deleteMovie(id).unwrap();
        setMovies(prevMovies => prevMovies.filter(movie => movie.id !== id));
        alert("Movie deleted successfully");
      } catch (error) {
        alert("Failed to delete the movie");
      }
    }
  };

  return (
    <section className="movies-section">
      <h2 className="text-center p-5">Movies Dashboard</h2>
      <table className="movies-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Thumb Img</th>
            <th>Thumb Bg Img</th>
            <th>Title</th>
            <th>Year</th>
            <th>IsFree</th>
            <th>Duration</th>
            <th>IMDB Rate</th>
            <th>Summary</th>
            <th>ViewCount</th>
            <th>Genres</th>
            <th>Tags</th>
            <th>Original Language</th>
            <th>Countries</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map(movie => (
            <tr key={movie.id}>
              <td>{movie.id}</td>
              <td>
                <img src={movie.thumbImgURL} width={100} height={100} alt={movie.name} />
              </td>
              <td>
                <img src={movie.thumbBgImgURL} width={100} height={100} alt={movie.name} />
              </td>
              <td>{movie.name}</td>
              <td>{new Date(movie.releasedDate).getFullYear()}</td>
              <td>{movie.isFree ? "Yes" : "No"}</td>
              <td>{movie.duration}</td>
              <td>{movie.imdbRate}</td>
              <td>{movie.summary}</td>
              <td>{movie.viewCount}</td>
              <td>
                {movie.genres.map(genre => (
                  <span key={genre.id}>{genre.name} </span>
                ))}
              </td>
              <td>
                {movie.tags.map(tag => (
                  <span key={tag.id}>{tag.name} </span>
                ))}
              </td>
              <td>{movie.originalLanguageName}</td>
              <td>
                {movie.countries.map(country => (
                  <span key={country.id}>{country.name} </span>
                ))}
              </td>
              <td className="actions">
                <button className="icon-btn" onClick={() => navigate(`/Movie/${movie.id}`)}>
                  <FontAwesomeIcon icon={faInfoCircle} color="#0077ff" title="Details" />
                </button>
                <button className="icon-btn" onClick={() => navigate(`/Movie/${movie.id}/update`)}>
                  <FontAwesomeIcon icon={faEdit} color="green" title="Edit" />
                </button>
                <button className="icon-btn" onClick={() => handleDelete(movie.id)}>
                  <FontAwesomeIcon icon={faTrashAlt} color="red" title="Delete" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-controls">
        <button style={{ fontSize: "20px" }} className="btn btn-primary p-3" onClick={handlePreviousPage} disabled={page === 1}>
          Previous
        </button>
        <span style={{ color: "var(--dark-blue-color)", fontWeight: "600", fontSize: "20px" }}>Page {page}</span>
        <button style={{ fontSize: "20px" }} className="btn btn-primary p-3" onClick={handleNextPage} disabled={movies.length < pageSize}>
          Next
        </button>
      </div>
    </section>
  );
};

export default Movies;
