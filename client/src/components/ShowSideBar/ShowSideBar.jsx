import { Link } from "react-router-dom";
function Detail() {
  return (
    <div className="row">
      <div className="col-lg-6 mb-4">
        <h5>Show</h5>
        <span>Dahmer</span>
      </div>
      <div className="col-lg-6 mb-4">
        <h5>Released Date</h5>
        <span>19 September 2024</span>
      </div>
      <div className="col-lg-6 mb-4">
        <h5>Episode Numbers</h5>
        <span>194</span>
      </div>
      <div className="col-lg-6 mb-4">
        <h5>Season Numbers</h5>
        <span>2</span>
      </div>
      <div className="col-lg-6 mb-4">
        <h5>Original Language</h5>
        <span>English</span>
      </div>
      <div className="col-lg-6 mb-4">
        <h5>Country</h5>
        <span>USA</span>
      </div>
      <div className="col-lg-6 mb-4">
        <h5>Creator</h5>
        <span>Kevin Clark</span>
      </div>
      <div className="col-lg-6 mb-4">
        <h5>Actors</h5>
        <span>Evan Peters,</span>
        <span>Dwayne Johnson,</span>
        <span>Tom Holland</span>
      </div>
      <div className="col-lg-6">
        <h5>Tags</h5>
        <Link>dram,</Link>
        <Link>crime,</Link>
        <Link>crime</Link>
      </div>
    </div>
  );
}

function Show() {
  return (
    <div className="row">
      <div className="col-lg-6 mb-4">
        <h5>Show</h5>
        <span>Dahmer</span>
      </div>
      <div className="col-lg-6 mb-4">
        <h5>Released Date</h5>
        <span>19 September 2024</span>
      </div>
      <div className="col-lg-6 mb-4">
        <h5>Episode</h5>
        <span>1</span>
      </div>
      <div className="col-lg-6 mb-4">
        <h5>Season Number</h5>
        <span>2</span>
      </div>
      <div className="col-lg-6 mb-4">
        <h5>Original Language</h5>
        <span>English</span>
      </div>
      <div className="col-lg-6 mb-4">
        <h5>Country</h5>
        <span>USA</span>
      </div>
      <div className="col-lg-6 mb-4">
        <h5>Views</h5>
        <span>256</span>
      </div>
      <div className="col-lg-6 mb-4">
        <h5>Actors</h5>
        <span>Evan Peters,</span>
        <span>Dwayne Johnson,</span>
        <span>Tom Holland</span>
      </div>
      <div className="col-lg-6">
        <h5>Tags</h5>
        <Link>dram,</Link>
        <Link>crime,</Link>
        <Link>crime</Link>
      </div>
    </div>
  );
}
function Movie() {
  return (
    <div className="row">
      <div className="col-lg-6 mb-4">
        <h5>Movie</h5>
        <span>Inception</span>
      </div>
      <div className="col-lg-6 mb-4">
        <h5>Released Date</h5>
        <span>19 September 2024</span>
      </div>
      <div className="col-lg-6 mb-4">
        <h5>Original Language</h5>
        <span>English</span>
      </div>
      <div className="col-lg-6 mb-4">
        <h5>Views</h5>
        <span>256</span>
      </div>
      <div className="col-lg-6 mb-4">
        <h5>Country</h5>
        <span>USA</span>
      </div>
      <div className="col-lg-6 mb-4">
        <h5>Actors</h5>
        <span>Evan Peters,</span>
        <span>Dwayne Johnson,</span>
        <span>Tom Holland</span>
      </div>
      <div className="col-lg-6">
        <h5>Tags</h5>
        <Link>dram,</Link>
        <Link>crime,</Link>
        <Link>crime</Link>
      </div>
    </div>
  );
}

const ShowSidebar = () => {
  const isShowPage = window.location.href.includes("/show");
  const isMoviePage = window.location.href.includes("/movie");

  return (
    <div className="show-content__right col-lg-3">
      <div className="show-content__right-top">
        <div className="d-flex poster-info">
          <div className="poster-info__img-container me-3">
            <img src="/public/assets/img/show/movie/thumbnailjpg.jpg" alt="Dahmer Poster" height={250} />
          </div>
          <div>
            <h4 className="poster-info__name">Dahmer</h4>
            <ul className="list-unstyled">
              <li className="poster-info__genre-item">
                <Link className="poster-info__genre-link" to="/drama">
                  Drama,
                </Link>
              </li>
              <li className="poster-info__genre-item">
                <Link className="poster-info__genre-link" to="/crime">
                  Crime
                </Link>
              </li>
            </ul>
            <div>
              <img src="/public/assets/img/slider/imdb.png" alt="IMDB Logo" width={50} />
              <span className="poster-info__imdb-rating mx-2">7.9</span>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="show-content__right-bottom poster-data">
        <h4>Short Summary</h4>
        <p className="mb-4 poster-data__summary">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio officia explicabo repudiandae dolorem tempora, nobis recusandae perspiciatis vel quia. Doloribus, necessitatibus.</p>
        <h4 className="mb-3">Details</h4>
        {isMoviePage && <Movie />}
        {!isMoviePage && (isShowPage ? <Show /> : <Detail />)}
      </div>
    </div>
  );
};

export default ShowSidebar;
