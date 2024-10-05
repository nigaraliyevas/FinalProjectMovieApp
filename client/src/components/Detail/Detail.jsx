import ShowSideBar from "../ShowSideBar/ShowSideBar";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Detail.css";
const Detail = () => {
  return (
    <>
      <section className="detail-section">
        <div className="custom-container-lg">
          <div className="d-flex gap-4">
            <div className="col-lg-9">
              <div className="detail-info">
                <div className="detail-info__img-container">
                  <img src="/public/assets/img/show/detail/dahmer.png" alt="" />
                  <h2 className="detail-info__name">Dahmer</h2>
                </div>
                <h3 className="detail-info__episode-title">Episodes</h3>
                <div className="detail-info__seasons my-4">
                  <Link to="" className="detail-info__season">
                    1 Season
                  </Link>
                  <Link to="" className="detail-info__season">
                    2 Season
                  </Link>
                  <Link to="" className="detail-info__season">
                    3 Season
                  </Link>
                  <Link to="" className="detail-info__season">
                    4 Season
                  </Link>
                  <Link to="" className="detail-info__season">
                    5 Season
                  </Link>
                </div>
                <div className="detail-info__season-episodes">
                  <div className="d-flex gap-3 flex-wrap">
                    <div className="col-lg-3 episode">
                      <Link to="" className="detail-info__season-episode">
                        <h5 className="detail-info__show-name">Dahmer</h5>
                        <span className="detail-info__show-desc">1.Season 1.Episode</span>
                      </Link>
                    </div>
                    <div className="col-lg-3 episode">
                      <Link to="" className="detail-info__season-episode">
                        <h5 className="detail-info__show-name">Dahmer</h5>
                        <span className="detail-info__show-desc">1.Season 1.Episode</span>
                      </Link>
                    </div>
                    <div className="col-lg-3 episode">
                      <Link to="" className="detail-info__season-episode">
                        <h5 className="detail-info__show-name">Dahmer</h5>
                        <span className="detail-info__show-desc">1.Season 1.Episode</span>
                      </Link>
                    </div>
                    <div className="col-lg-3 episode">
                      <Link to="" className="detail-info__season-episode">
                        <h5 className="detail-info__show-name">Dahmer</h5>
                        <span className="detail-info__show-desc">1.Season 1.Episode</span>
                      </Link>
                    </div>
                    <div className="col-lg-3 episode">
                      <Link to="" className="detail-info__season-episode">
                        <h5 className="detail-info__show-name">Dahmer</h5>
                        <span className="detail-info__show-desc">1.Season 1.Episode</span>
                      </Link>
                    </div>
                    <div className="col-lg-3 episode">
                      <Link to="" className="detail-info__season-episode">
                        <h5 className="detail-info__show-name">Dahmer</h5>
                        <span className="detail-info__show-desc">1.Season 1.Episode</span>
                      </Link>
                    </div>
                    <div className="col-lg-3 episode">
                      <Link to="" className="detail-info__season-episode">
                        <h5 className="detail-info__show-name">Dahmer</h5>
                        <span className="detail-info__show-desc">1.Season 1.Episode</span>
                      </Link>
                    </div>
                    <div className="col-lg-3 episode">
                      <Link to="" className="detail-info__season-episode">
                        <h5 className="detail-info__show-name">Dahmer</h5>
                        <span className="detail-info__show-desc">1.Season 1.Episode</span>
                      </Link>
                    </div>
                    <div className="col-lg-3 episode">
                      <Link to="" className="detail-info__season-episode">
                        <h5 className="detail-info__show-name">Dahmer</h5>
                        <span className="detail-info__show-desc">1.Season 1.Episode</span>
                      </Link>
                    </div>
                    <div className="col-lg-3 episode">
                      <Link to="" className="detail-info__season-episode">
                        <h5 className="detail-info__show-name">Dahmer</h5>
                        <span className="detail-info__show-desc">1.Season 1.Episode</span>
                      </Link>
                    </div>
                    <div className="col-lg-3 episode">
                      <Link to="" className="detail-info__season-episode">
                        <h5 className="detail-info__show-name">Dahmer</h5>
                        <span className="detail-info__show-desc">1.Season 1.Episode</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ShowSideBar />
          </div>
        </div>
      </section>
    </>
  );
};

export default Detail;
