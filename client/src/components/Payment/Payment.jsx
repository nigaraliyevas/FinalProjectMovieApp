import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { useRegisterUserMutation } from "../../features/auth/authApi";

const stripePromise = loadStripe("your-publishable-key-from-stripe");

const Payment = () => {
  const [sessionId, setSessionId] = useState(null);
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  useEffect(() => {
    // Fetch the registration data from session storage
    const formData = JSON.parse(sessionStorage.getItem("registerFormData"));
    if (!formData) {
      // If no data is found, redirect to register
      navigate("/register");
    } else {
      // Call the API to create a checkout session
      const createCheckoutSession = async () => {
        try {
          const response = await fetch("https://localhost:44359/api/Auth/create-checkout-session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: formData.email }),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          setSessionId(data.sessionId);

          // Redirect to Stripe Checkout immediately after getting sessionId
          const stripe = await stripePromise;
          await stripe.redirectToCheckout({ sessionId: data.sessionId });
        } catch (error) {
          console.error("Error creating checkout session:", error);
        }
      };
      createCheckoutSession();
    }
  }, [navigate]);

  // Handle registration after payment is confirmed (this could be adjusted based on your app logic)
  useEffect(() => {
    const handleRegistration = async () => {
      const subscriptionPlanId = localStorage.getItem("subscriptionPlanId");
      const formData = JSON.parse(sessionStorage.getItem("registerFormData"));
      if (formData && sessionId) {
        await registerUser({ ...formData, subscriptionId: subscriptionPlanId });
        sessionStorage.removeItem("registerFormData");
        navigate("/login");
      }
    };

    if (sessionId) {
      handleRegistration();
    }
  }, [sessionId, registerUser, navigate]);

  return (
    <div>
      <h2>Redirecting to payment...</h2>
      {isLoading && <p>Processing payment...</p>}
    </div>
  );
};

export default Payment;
