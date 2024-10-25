import { useNavigate } from "react-router-dom";
import "./PaymentCancel.css";

const PaymentCancel = () => {
  const navigate = useNavigate();

  return (
    <div className="payment-cancel-container">
      <p className="cancel-message">Payment was canceled or failed. Please try again or choose a different plan.</p>
      <button onClick={() => navigate("/register")} className="retry-button">
        Try Again
      </button>
    </div>
  );
};

export default PaymentCancel;
