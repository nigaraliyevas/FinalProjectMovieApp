import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { usePaymentSuccessMutation } from "../../features/auth/authApi";
import "./PaymentSuccess.css";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const sessionId = new URLSearchParams(location.search).get("session_id");
  const [paymentSuccess, { isLoading, isError, isSuccess, error }] = usePaymentSuccessMutation();

  useEffect(() => {
    if (sessionId) {
      paymentSuccess(sessionId);
    }
  }, [sessionId, paymentSuccess]);

  useEffect(() => {
    if (isSuccess) {
      // Redirect to registration success or login
      navigate("/login");
    }
  }, [isSuccess, navigate]);

  return (
    <div className="payment-success-container">
      {isLoading ? <p className="loading-message">Processing your payment...</p> : null}
      {isSuccess ? <p className="success-message">Payment was successful! You will be redirected shortly.</p> : null}
      {isError ? <p className="error-message">Payment failed: {error?.message}</p> : null}
    </div>
  );
};

export default PaymentSuccess;
