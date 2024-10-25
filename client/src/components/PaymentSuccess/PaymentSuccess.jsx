// import { useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { usePaymentSuccessMutation } from "../../features/auth/authApi";
// import "./PaymentSuccess.css";

// const PaymentSuccess = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   // const sessionId = new URLSearchParams(location.search).get("session_id");
//   const [paymentSuccess, { isLoading, isError, isSuccess, error }] = usePaymentSuccessMutation();
//   const sessionId = JSON.parse(sessionStorage.getItem("sessionId"));

//   useEffect(() => {
//     paymentSuccess(sessionId);
//   }, [sessionId, paymentSuccess]);

//   useEffect(() => {
//     if (isSuccess) {
//       // Redirect to registration success or login
//       navigate("/login");
//     }
//   }, [isSuccess, navigate]);

//   return (
//     <div className="payment-success-container">
//       {isLoading ? <p className="loading-message">Processing your payment...</p> : null}
//       {isSuccess ? <p className="success-message">Payment was successful! You will be redirected shortly.</p> : null}
//       {isError ? <p className="error-message">Payment failed: {error?.message}</p> : null}
//     </div>
//   );
// };

// export default PaymentSuccess;

// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { usePaymentSuccessMutation, useRegisterUserMutation } from "../../features/auth/authApi";
// import "./PaymentSuccess.css";

// const PaymentSuccess = () => {
//   const navigate = useNavigate();
//   const [paymentSuccess, { isLoading, isError, isSuccess, error }] = usePaymentSuccessMutation();
//   const [registerUser] = useRegisterUserMutation();

//   useEffect(() => {
//     const sessionId = JSON.parse(sessionStorage.getItem("sessionId"));
//     if (sessionId) {
//       // Confirm payment success
//       paymentSuccess(sessionId);
//     }
//   }, [paymentSuccess]);

//   useEffect(() => {
//     if (isSuccess) {

//       const formData = JSON.parse(sessionStorage.getItem("registerFormData"));
//       const subscriptionPlanId = parseInt(JSON.parse(localStorage.getItem("subscriptionPlanId")));

//       if (formData) {
//         registerUser({ ...formData, subscriptionPlanId });
//         sessionStorage.removeItem("registerFormData");
//         sessionStorage.removeItem("sessionId");
//         navigate("/login");
//       }
//     }
//   }, [isSuccess, registerUser, navigate]);

//   return (
//     <div className="payment-success-container">
//       {isLoading && <p className="loading-message text-center">Processing your payment...</p>}
//       {isSuccess && <p className="success-message">Payment was successful! You will be redirected shortly.</p>}
//       {isError && <p className="error-message">Payment failed: {error?.message}</p>}
//     </div>
//   );
// };

// export default PaymentSuccess;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePaymentSuccessMutation, useRegisterUserMutation } from "../../features/auth/authApi";
import "./PaymentSuccess.css";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [paymentSuccess, { isLoading, isError, error }] = usePaymentSuccessMutation();
  const [registerUser] = useRegisterUserMutation();

  useEffect(() => {
    const sessionId = sessionStorage.getItem("sessionId");
    if (sessionId) {
      // Send sessionId in the correct format
      const sendPaymentSuccess = async () => {
        try {
          await fetch("https://localhost:44359/api/Auth/payment-success", {
            // Replace with your API URL
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ sessionId }),
          });
          const formData = JSON.parse(sessionStorage.getItem("registerFormData"));
          const subscriptionPlanId = parseInt(sessionStorage.getItem("subscriptionPlanId"));

          if (formData) {
            registerUser({ subscriptionPlanId, ...formData });
            sessionStorage.removeItem("registerFormData");
            sessionStorage.removeItem("sessionId");
            navigate("/login");
          }
        } catch (error) {
          console.error("Payment request failed:", error);
        }
      };

      sendPaymentSuccess();
    }
  }, [registerUser, navigate]);
  return (
    <div className="payment-success-container">
      {isLoading && <p className="loading-message text-center">Processing your payment...</p>}
      {isError && <p className="error-message">Payment failed: {error?.message}</p>}
    </div>
  );
};

export default PaymentSuccess;
