// src/components/ModalComponent.jsx
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import { closeModal } from "../../redux/slices/showSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "./VideoModal.css";

const VideoModal = () => {
  const dispatch = useDispatch();
  const { showModal, videoUrl } = useSelector(state => state.modal);

  const handleClose = () => {
    dispatch(closeModal());
  };
  const movie1 = videoUrl.split("/file/")[1];

  const resetVideo = () => {
    const iframe = document.getElementById("youtube-iframe");
    if (iframe) {
      const src = iframe.getAttribute("src");
      iframe.setAttribute("src", "");
      iframe.setAttribute("src", src);
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose} onExited={resetVideo} centered size="lg">
      <Modal.Body className="p-0 overflow-hidden">
        <div className="embed-responsive embed-responsive-16by9">
          <div className="min-vh-100 d-flex align-items-center">
            <iframe id="youtube-iframe" width="100%" height="500" src={`https://mega.nz/embed/${movie1}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title="YouTube video player"></iframe>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default VideoModal;
