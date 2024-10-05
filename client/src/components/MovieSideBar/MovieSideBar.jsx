import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart, faForward, faBackward } from "@fortawesome/free-solid-svg-icons";
import { faComment, faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MovieSideBar.css";
import LoadMore from "../LoadMore/LoadMore";
const MovieSideBar = () => {
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
  const noComment = () => {
    return (
      <div className="">
        <h3 className="text-center text-danger my-3">No Comments...</h3>
      </div>
    );
  };
  return (
    <>
      <div className="show-content__left col-lg-9">
        <div className="video-container" onClick={handlePlay}>
          {!isPlaying && (
            <>
              <div className="thumbnail" style={{ backgroundImage: "url(/public/assets/img/show/movie/dahmer.png)" }}></div>
              <div className="show__play-button"></div>
            </>
          )}

          {isPlaying && <iframe id="video-iframe" src={"public/assets/img/show/movie/Top 10 Scariest Moments from the Jeffrey Dahmer Netflix Series.mp4"} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title="YouTube video player"></iframe>}
        </div>
            {/* eger movie dise pagination olmayacaq , shows dursa olacaq */}
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

        <div className="show-comments">
          <div className="show-comments__top">
            <div className="d-flex justify-content-between">
              <h2 className="show-comments__top-header">Comments</h2>
              <button id="add-comment__btn" onClick={() => setIsCommented(!isCommented)}>
                Add Comment
              </button>
            </div>
            <hr className="show-comments__top-hr" />
          </div>
          <div className="show-comments__bottom">
            <div className="show-comments__bottom-all-comments">
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
              <div className="show-comments__bottom-comment bottom-comment">
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
              <LoadMore />
            </div>
          </div>
        </div>
        {/* {noComment()} */}
      </div>
    </>
  );
};

export default MovieSideBar;
