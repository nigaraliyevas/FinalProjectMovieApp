import { Link } from "react-router-dom";

const MovieDetail = () => {
  return (
    <section className="movie-detail">
      <div className="custom-container-lg">
        <div className="movie-content">
          <div className="movie">
            <div className="movie-name">
              <Link to="/detail" className="movie-name__title">
                Dahmer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieDetail;
