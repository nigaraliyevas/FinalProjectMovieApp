import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetSubscriptionPlansQuery, useDeleteSubscriptionPlanMutation } from "../../features/subscriptionPlan/subscriptionPlanApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "./SubscriptionPlan.css";

const SubscriptionPlan = () => {
  const navigate = useNavigate();
  const { data: subscriptionPlans, isLoading, error } = useGetSubscriptionPlansQuery();
  const [deleteSubscriptionPlan] = useDeleteSubscriptionPlanMutation();
  const [loading, setLoading] = useState(false);

  const handleDelete = async id => {
    if (window.confirm("Are you sure you want to delete this subscription plan?")) {
      try {
        setLoading(true);
        await deleteSubscriptionPlan(id).unwrap();
        alert("Subscription plan deleted successfully");
      } catch (err) {
        alert("Failed to delete the subscription plan");
      } finally {
        setLoading(false);
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading subscription plans</div>;

  return (
    <section className="subscription-plan-list">
      <div className="container">
        <h2>Subscription Plans</h2>
        <table>
          <thead>
            <tr>
              <th>Price</th>
              <th>Max Movies</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscriptionPlans?.map(plan => (
              <tr key={plan.id}>
                <td>{plan.price}</td>
                <td>{plan.maxMovies ? plan.maxMovies : "Unlimited"}</td>
                <td>
                  <button onClick={() => navigate(`/plans/update/${plan.id}`)} className="btn btn-light">
                    <FontAwesomeIcon icon={faEdit} color="green" title="Edit" size="xl" />
                  </button>
                  <button onClick={() => handleDelete(plan.id)} className="btn btn-light" disabled={loading}>
                    <FontAwesomeIcon icon={faTrashAlt} color="red" title="Delete" size="xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default SubscriptionPlan;
