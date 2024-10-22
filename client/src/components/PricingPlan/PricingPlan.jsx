// import BreadCrumb from "../BreadCrumb/BreadCrumb";
// import "./PricingPlan.css";
// const PricingPlan = () => {
//   return (
//     <>
//       <section className="pricing">
//         <BreadCrumb location="Pricing Plan" />
//         <div className="custom-container-lg">
//           <div className="pricing-table">
//             <div className="pricing-table__row d-flex mb-5 gap-5">
//               <div className="pricing-table__column column-top">
//                 <div className="column-top__img" style={{ backgroundImage: `url("/public/assets/img/auth/login.jpg")`, backgroundSize: "cover", backgroundPosition: "center" }}>
//                   <div className="h-100 d-flex justify-content-center align-items-center">
//                     <div className="position-relative text-lg">
//                       <h2 className="column-top__header">Free</h2>
//                       <h3 className="column-top__price">$ 00.00</h3>
//                       <span className="column-top__plan">5 Movie Limit</span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="column-bottom">
//                   <div className="column-bottom__box">
//                     <p>5 Movie Limit</p>
//                     <div className="text-center mt-3">
//                       <button className="column-bottom__btn">Purchase Now</button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="pricing-table__column column-top">
//                 <div className="column-top__img column-top__img--blue" style={{ backgroundImage: `url("/public/assets/img/auth/login.jpg")`, backgroundSize: "cover", backgroundPosition: "center" }}>
//                   <div className="h-100 d-flex justify-content-center align-items-center">
//                     <div className="position-relative text-lg">
//                       <h2 className="column-top__header">Premium</h2>
//                       <h3 className="column-top__price">$ 199.00</h3>
//                       <span className="column-top__plan">/ Entire Life</span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="column-bottom">
//                   <div className="column-bottom__box">
//                     <p>Limitless Movies</p>
//                     <p>High Quality</p>
//                     <div className="text-center mt-3">
//                       <button className="column-bottom__btn">Purchase Now</button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default PricingPlan;

import { Link } from "react-router-dom";
import { useGetSubscriptionPlansQuery } from "../../features/plans/plansApi";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import "./PricingPlan.css";

const PricingPlan = () => {
  const { data: subscriptionPlans, error, isLoading } = useGetSubscriptionPlansQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading subscription plans.</div>;

  return (
    <>
      <section className="pricing">
        <BreadCrumb location="Pricing Plan" />
        <div className="custom-container-lg">
          <div className="pricing-table">
            <div className="pricing-table__row d-flex mb-5 gap-5">
              {subscriptionPlans?.map(plan => (
                <div key={plan.id} className="pricing-table__column column-top">
                  <div
                    className="column-top__img"
                    style={{
                      backgroundImage: `url("/public/assets/img/auth/login.jpg")`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="h-100 d-flex justify-content-center align-items-center">
                      <div className="position-relative text-lg">
                        <h2 className="column-top__header">{plan.planRoleNames[0].name}</h2>
                        <h3 className="column-top__price">${plan.price.toFixed(2)}</h3>
                        <span className="column-top__plan">{plan.planRoleNames[0].feature}</span>
                      </div>
                    </div>
                  </div>
                  <div className="column-bottom">
                    <div className="column-bottom__box">
                      <p>{plan.planRoleNames[0].feature}</p>
                      <div className="text-center mt-3">
                        <Link to="/register" className="column-bottom__btn">
                          Purchase Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PricingPlan;
