import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetSubscriptionPlanByIdQuery, useUpdateSubscriptionPlanMutation } from "../../features/subscriptionPlan/subscriptionPlanApi";
import "./SubscriptionPlanUpdate.css";
const UpdateSubscriptionPlan = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: subscriptionPlan, isLoading, error } = useGetSubscriptionPlanByIdQuery(id);

  const [updateSubscriptionPlan] = useUpdateSubscriptionPlanMutation();

  const [formData, setFormData] = useState({
    price: "",
    maxMovies: "",
  });

  useEffect(() => {
    if (subscriptionPlan) {
      setFormData({
        price: subscriptionPlan.price,
        maxMovies: Number(subscriptionPlan.maxMovies) || "",
      });
    }
  }, [subscriptionPlan]);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await updateSubscriptionPlan({ id, ...formData }).unwrap();
      alert("Subscription plan updated successfully");
      navigate("/plans");
    } catch (error) {
      alert("Failed to update subscription plan");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading subscription plan</div>;

  return (
    <section className="update-subscription-plan">
      <div className="container">
        <h2>Update Subscription Plan</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="maxMovies">Max Movies (Leave empty for unlimited):</label>
            <input type="number" id="maxMovies" name="maxMovies" value={formData.maxMovies} onChange={handleChange} placeholder="Enter max movies or leave blank for unlimited" />
          </div>
          <button type="submit" className="btn btn-primary">
            Update Subscription Plan
          </button>
        </form>
      </div>
    </section>
  );
};

export default UpdateSubscriptionPlan;
