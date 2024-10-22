import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart, faUser } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MovieSideBar.css";
import { jwtDecode } from "jwt-decode";
import { Modal, Button } from "react-bootstrap";
import { useGetMovieByIdQuery } from "../../features/movies/moviesApi";
import { useCreateCommentMutation, useDeleteCommentMutation } from "../../features/comments/commentApi.js";

const MovieSideBar = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCommented, setIsCommented] = useState(false);
  const [username, setUsername] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [commentsToShow, setCommentsToShow] = useState(5);
  const [userImage, setUserImage] = useState(null);

  const { id } = useParams();
  const { data: movie, error, isLoading } = useGetMovieByIdQuery(id);

  const [createComment] = useCreateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const extractUsernameFromToken = token => {
    try {
      const decoded = jwtDecode(token);
      return decoded.username || decoded.unique_name || decoded.sub;
    } catch (error) {
      console.error("Error decoding token", error);
      return null;
    }
  };
  const extractUserImgFromToken = token => {
    try {
      const decoded = jwtDecode(token);
      return decoded.userImage;
    } catch (error) {
      console.error("Error decoding token", error);
      return null;
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      const extractedUsername = extractUsernameFromToken(token);
      const extractedUserImg = extractUserImgFromToken(token);
      if (extractedUsername || extractedUserImg) {
        setUsername(extractedUsername);
        setUserImage(extractedUserImg);
      }
    }
  }, []);

  useEffect(() => {
    if (movie) {
      setComments(movie.comments); // Initialize comments from movie data
    }
  }, [movie]);

  const handleLoginModalShow = () => setShowLoginModal(true);

  const handleSubmitComment = async e => {
    e.preventDefault();

    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const decodedToken = token ? jwtDecode(token) : null;
    const appUserId = decodedToken ? decodedToken.id : null;

    if (!appUserId || !commentText.trim()) {
      return;
    }

    const newComment = {
      text: commentText,
      appUserId,
      movieId: id,
      parentCommentId: null,
    };

    try {
      const result = await createComment(newComment).unwrap();
      setComments(prev => [...prev, result]);
      setNotificationMessage("Comment added successfully!");
      setShowNotificationModal(true);
      setCommentText((e.target.commentText.value = ""));
    } catch (error) {
      console.error("Failed to post comment: ", error);
    }
  };
  const handleDeleteComment = async commentId => {
    try {
      await deleteComment(commentId).unwrap();
      setComments(prev => prev.filter(comment => comment.id !== commentId));
      setNotificationMessage("Comment deleted successfully!");
      setShowNotificationModal(true);
    } catch (error) {
      console.error("Failed to delete comment: ", error);
    }
  };
  const noComment = () => {
    return (
      <div>
        <h3 className="text-center text-primary py-5">There is no comment...</h3>
      </div>
    );
  };
  const loadMoreComments = () => {
    setCommentsToShow(prev => prev + 5);
  };
  const getDate = fullDate => {
    const date = new Date(fullDate);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="show-content__left col-lg-9">
        <div className="video-container" onClick={handlePlay}>
          {!isPlaying && (
            <>
              <div className="thumbnail" style={{ backgroundImage: `url(${movie.thumbBgImgURL})` }}></div>
              <div className="show__play-button"></div>
            </>
          )}
          {isPlaying && <iframe id="video-iframe" src={`https://mega.nz/embed/${movie.movieURL.split("/file/")[1]}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title="Movie Player"></iframe>}
        </div>

        <div className="show-comments">
          <div className="show-comments__top">
            <div className="d-flex justify-content-between">
              <h2 className="show-comments__top-header">Comments</h2>
              <button id="add-comment__btn" onClick={username ? () => setIsCommented(!isCommented) : handleLoginModalShow}>
                Add Comment
              </button>
            </div>
            <hr className="show-comments__top-hr" />
          </div>

          <div className="show-comments__bottom">
            <div className="show-comments__bottom-all-comments">
              {isCommented && username && (
                <div className="user-form__container p-2 my-4">
                  <h6>Add Comment</h6>
                  <form className="comment-user__form" onSubmit={handleSubmitComment}>
                    <Link to="" className="comment-user__name text-white d-block">
                      {username}
                    </Link>
                    <div className="d-flex justify-content-between">
                      <textarea name="commentText" type="text" className="comment-user__form-input" placeholder="What a moment!" onChange={e => setCommentText(e.target.value)} />
                      <button type="submit" className="comment-user__form-btn">
                        Comment
                      </button>
                    </div>
                  </form>
                </div>
              )}
              {comments.length === 0 ? (
                noComment()
              ) : (
                <div className="show-comments__bottom-comment bottom-comment">
                  <div className="row">
                    {comments.slice(0, commentsToShow).map(comment => (
                      <div key={comment.id} className="col-12 mb-3">
                        <div className="d-flex align-items-center">
                          <div className="bottom-comment__img-container d-inline-block">
                            {/* Use comment.userImg instead of userImage */}
                            {comment.userImg ? <img width={75} height={75} src={comment.userImg} alt="" style={{ borderRadius: "50%" }} /> : <FontAwesomeIcon className="user-icon" icon={faUser} style={{ color: "#ffffff" }} />}
                          </div>
                          <Link id={comment.appUserId} to="" className="comment-user__name text-white">
                            {comment.appUser}
                          </Link>
                          <span>{getDate(comment.createdAt)}</span>
                          {comment.appUserId === jwtDecode(localStorage.getItem("token") || sessionStorage.getItem("token")).id && (
                            <button onClick={() => handleDeleteComment(comment.id)} className="delete-button">
                              Delete
                            </button>
                          )}
                        </div>
                        <div className="comment-user">
                          <div className="comment-user__info ms-2">
                            <p className="comment-user__comment-text">{comment.commentText}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {commentsToShow < movie.comments.length && (
                    <section className="loadmore">
                      <div className="loadmore-container mt-5">
                        {movie.comments.length < 5 ? (
                          ""
                        ) : (
                          <button className="loadmore-container__btn" onClick={loadMoreComments}>
                            Load More ...
                          </button>
                        )}
                      </div>
                    </section>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Modal for popuops*/}
        <Modal show={showNotificationModal} onHide={() => setShowNotificationModal(false)}>
          <div className="notification-modal">
            <Modal.Header closeButton>
              <Modal.Title>Notification</Modal.Title>
            </Modal.Header>
            <Modal.Body>{notificationMessage}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowNotificationModal(false)}>
                Close
              </Button>
            </Modal.Footer>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default MovieSideBar;
