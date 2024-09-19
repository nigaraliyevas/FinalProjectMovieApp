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
          <iframe id="youtube-iframe" width="100%" height="500" src={videoUrl} allow="encrypted-media" allowFullScreen title="YouTube Trailer"></iframe>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default VideoModal;
