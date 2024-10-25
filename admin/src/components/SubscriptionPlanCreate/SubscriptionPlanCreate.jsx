import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateSubscriptionPlanMutation } from "../../features/subscriptionPlan/subscriptionPlanApi";
import "./SubscriptionPlanCreate.css";
const CreateSubscriptionPlan = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    price: "",
    maxMovies: "",
  });
  const [createSubscriptionPlan, { isLoading }] = useCreateSubscriptionPlanMutation();
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await createSubscriptionPlan(formData).unwrap();
      alert("Subscription plan created successfully");
      navigate("/plans");
    } catch (error) {
      setErrorMessage("Failed to create subscription plan");
    }
  };

  return (
    <section className="create-subscription-plan">
      <div className="container">
        <h2>Create Subscription Plan</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="maxMovies">Max Movies (Leave empty for unlimited):</label>
            <input type="number" id="maxMovies" name="maxMovies" value={formData.maxMovies} onChange={handleChange} placeholder="Enter max movies or leave blank for unlimited" />
          </div>
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Subscription Plan"}
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    </section>
  );
};

export default CreateSubscriptionPlan;
