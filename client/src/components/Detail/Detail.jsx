import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart, faCircleInfo, faForward, faBackward } from "@fortawesome/free-solid-svg-icons";
import { faComment, faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Detail.css";

const Detail = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isCommented, setIsCommented] = useState(false);
  const [isCommentBtn, setIsCommentBtn] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const toggleCommentVisibility = () => {
    setIsCommented(!isCommented);
    setIsCommentBtn(!isCommentBtn);
  };
  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <section className="detail-section">
      <div className="custom-container-lg">
        <div className="detail">
          <div className="detail-name">
            <Link to="/movie" className="detail-name__title">
              <FontAwesomeIcon icon={faCircleInfo} />
              Dahmer 2.Season 9.Episode
            </Link>
          </div>
        </div>
        <div className="detail-content d-flex gap-4">
          <div className="detail-content__left col-lg-9">
            <div className="video-container" onClick={handlePlay}>
              {!isPlaying && (
                <>
                  <div className="thumbnail" style={{ backgroundImage: "url(/public/assets/img/detail/movie/dahmer.png)" }}></div>
                  <div className="detail__play-button"></div>
                </>
              )}

              {isPlaying && <iframe id="video-iframe" src={"public/assets/img/detail/movie/Top 10 Scariest Moments from the Jeffrey Dahmer Netflix Series.mp4"} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title="YouTube video player"></iframe>}
            </div>

            <div className="video-pagination text-center">
              <button className="video-pagination__btn">
                <FontAwesomeIcon icon={faBackward} className="mx-2" />
                Previous Episode
              </button>
              <button className="video-pagination__btn">
                Next Episode
                <FontAwesomeIcon icon={faForward} className="mx-2" />
              </button>
            </div>

            <div className="detail-comments">
              <div className="detail-comments__top">
                <div className="d-flex justify-content-between">
                  <h2 className="detail-comments__top-header">Comments</h2>
                  <button id="add-comment__btn" onClick={() => setIsCommented(!isCommented)}>
                    Add Comment
                  </button>
                </div>
                <hr className="detail-comments__top-hr" />
              </div>
              <div className="detail-comments__bottom">
                <div className="detail-comments__bottom-all-comments">
                  {isCommented && !isCommentBtn && (
                    <div className="user-form__container p-2 my-4">
                      <h6>Add Comment</h6>
                      <form className="comment-user__form">
                        <Link to="" className="comment-user__name text-white d-block">
                          Mystery
                        </Link>
                        <div className="d-flex justify-content-between">
                          <textarea type="text" className="comment-user__form-input" placeholder="What a moment!" />
                          <button type="submit" className="comment-user__form-btn">
                            Comment
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                  <div className="detail-comments__bottom-comment bottom-comment">
                    <div className="row">
                      <div className="custom-col-1">
                        <div className="bottom-comment__img-container">
                          <img src="/public/assets/img/comment/user-image/user1.jpg" alt="" className="bottom-comment__img" />
                        </div>
                      </div>

                      <div className="custom-col-11 comment-user">
                        <div className="comment-user__info ms-2">
                          <Link to="" className="comment-user__name text-white">
                            Mystery
                          </Link>
                          <p className="comment-user__comment-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis eaque dolorum quis hic sit sed amet fuga consequuntur, dicta ex?</p>

                          <button onClick={toggleLike} style={{ background: "none", border: "none", cursor: "pointer" }}>
                            <FontAwesomeIcon icon={isLiked ? solidHeart : regularHeart} color={isLiked ? "white" : "white"} size="lg" />
                          </button>
                          <span className="comment-user__comment-like-count mx-2">5</span>

                          <button className="ms-1" onClick={() => toggleCommentVisibility()} style={{ background: "none", border: "none", cursor: "pointer" }}>
                            <FontAwesomeIcon icon={faComment} size="lg" color="white" />
                          </button>
                          {isCommentBtn && (
                            <div className="user-form__container p-2 mt-4">
                              <h6>Add Comment {isCommentBtn ? "to @Username" : ""}</h6>
                              <hr />
                              <form className="comment-user__form">
                                <Link to="" className="comment-user__name text-white d-block">
                                  Mystery
                                </Link>
                                <div className="d-flex justify-content-between">
                                  <textarea type="text" className="comment-user__form-input" placeholder="What a moment!" />
                                  <button type="submit" className="comment-user__form-btn">
                                    Comment
                                  </button>
                                </div>
                              </form>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Future comments list */}
                  <ul className=" list-unstyled ms-4 mt-4">
                    <li>
                      <div className="row">
                        <div className="custom-col-1">
                          <div className="bottom-comment__img-container">
                            <img src="/public/assets/img/comment/user-image/user1.jpg" alt="" className="bottom-comment__img" />
                          </div>
                        </div>
                        <div className="custom-col-11 comment-user">
                          <div className="comment-user__info ms-2">
                            <Link to="" className="comment-user__name text-white">
                              Mystery
                            </Link>
                            <p className="comment-user__comment-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis eaque dolorum quis hic sit sed amet fuga consequuntur, dicta ex?</p>

                            <button onClick={toggleLike} style={{ background: "none", border: "none", cursor: "pointer" }}>
                              <FontAwesomeIcon icon={isLiked ? solidHeart : regularHeart} color={isLiked ? "#fff" : "white"} size="lg" />
                            </button>
                            <span className="comment-user__comment-like-count mx-2">5</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>

                  {/* ends */}
                </div>
              </div>
            </div>
          </div>
          <div className="detail-content__right col-lg-3">
            <div className="detail-content__right-top">
              <div className="d-flex poster-info">
                <div className="poster-info__img-container me-3">
                  <img src="/public/assets/img/detail/movie/thumbnailjpg.jpg" alt="" height={250} />
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
                    <img src="/public/assets/img/slider/imdb.png" alt="" width={50} />
                    <span className="poster-info__imdb-rating mx-2">7.9</span>
                  </div>
                </div>
              </div>
            </div>

            <hr />

            <div className="detail-content__right-bottom poster-data">
              <h4>Summary</h4>
              <p className="mb-4 poster-data__summary">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio officia explicabo repudiandae dolorem tempora, nobis recusandae perspiciatis vel quia. Doloribus, necessitatibus.</p>
              <h4 className="mb-3">Details</h4>
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
                  <span>19 September 2024</span>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Detail;
