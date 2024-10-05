import BreadCrumb from "../BreadCrumb/BreadCrumb";
import "./PricingPlan.css";
const PricingPlan = () => {
  return (
    <>
      <section className="pricing">
        <BreadCrumb location="Pricing Plan" />
        <div className="custom-container-lg">
          <div className="pricing-table">
            <div className="pricing-table__row d-flex mb-5 gap-5">
              <div className="pricing-table__column column-top">
                <div className="column-top__img" style={{ backgroundImage: `url("/public/assets/img/auth/login.jpg")`, backgroundSize: "cover", backgroundPosition: "center" }}>
                  <div className="h-100 d-flex justify-content-center align-items-center">
                    <div className="position-relative text-lg">
                      <h2 className="column-top__header">Basic</h2>
                      <h3 className="column-top__price">$ 29.00</h3>
                      <span className="column-top__plan">/ Per Month</span>
                    </div>
                  </div>
                </div>
                <div className="column-bottom">
                  <div className="column-bottom__box">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <p>Voluptatem eius sit doloribus quas ut consequatur dolorum!</p>
                    <p>Tenetur ducimus totam commodi animi. Amet, consectetur magni?</p>
                    <p>
                      <s>Ducimus unde quia omnis suscipit distinctio dignissimos assumenda.</s>
                    </p>
                    <p>
                      <s>Doloribus iste maiores quis minima voluptate nam ullam.</s>
                    </p>
                    <p>Quis a laboriosam asperiores voluptate distinctio corrupti deleniti!</p>
                    <div className="text-center mt-3">
                      <button className="column-bottom__btn">Purchase Now</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pricing-table__column column-top">
                <div className="column-top__img column-top__img--blue" style={{ backgroundImage: `url("/public/assets/img/auth/login.jpg")`, backgroundSize: "cover", backgroundPosition: "center" }}>
                  <div className="h-100 d-flex justify-content-center align-items-center">
                    <div className="position-relative text-lg">
                      <h2 className="column-top__header">Standart</h2>
                      <h3 className="column-top__price">$ 49.00</h3>
                      <span className="column-top__plan">/ Per Month</span>
                    </div>
                  </div>
                </div>
                <div className="column-bottom">
                  <div className="column-bottom__box">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <p>Voluptatem eius sit doloribus quas ut consequatur dolorum!</p>
                    <p>Tenetur ducimus totam commodi animi. Amet, consectetur magni?</p>
                    <p>
                      <s>Ducimus unde quia omnis suscipit distinctio dignissimos assumenda.</s>
                    </p>
                    <p>
                      <s>Doloribus iste maiores quis minima voluptate nam ullam.</s>
                    </p>
                    <p>Quis a laboriosam asperiores voluptate distinctio corrupti deleniti!</p>
                    <div className="text-center mt-3">
                      <button className="column-bottom__btn">Purchase Now</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pricing-table__column column-top">
                <div className="column-top__img" style={{ backgroundImage: `url("/public/assets/img/auth/login.jpg")`, backgroundSize: "cover", backgroundPosition: "center" }}>
                  <div className="h-100 d-flex justify-content-center align-items-center">
                    <div className="position-relative text-lg">
                      <h2 className="column-top__header">Premium</h2>
                      <h3 className="column-top__price">$ 120.00</h3>
                      <span className="column-top__plan">/ Per Month</span>
                    </div>
                  </div>
                </div>
                <div className="column-bottom">
                  <div className="column-bottom__box">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <p>Voluptatem eius sit doloribus quas ut consequatur dolorum!</p>
                    <p>Tenetur ducimus totam commodi animi. Amet, consectetur magni?</p>
                    <p>
                      <s>Ducimus unde quia omnis suscipit distinctio dignissimos assumenda.</s>
                    </p>
                    <p>
                      <s>Doloribus iste maiores quis minima voluptate nam ullam.</s>
                    </p>
                    <p>Quis a laboriosam asperiores voluptate distinctio corrupti deleniti!</p>
                    <div className="text-center mt-3">
                      <button className="column-bottom__btn">Purchase Now</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PricingPlan;
