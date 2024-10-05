import { Link, useLocation, useNavigate } from "react-router-dom";
import Input from "../Input/Input";
import "./FormBox.css";
import { useEffect } from "react";
const FormBox = ({ bgImg }) => {
  const location = useLocation();
  const address = location.pathname;

  const navigate = useNavigate();
  const renderForm = () => {
    if (address.includes("/register")) {
      return <RegisterBox />;
    } else if (address.includes("/login")) {
      return <LoginBox />;
    } else if (address.includes("/recover")) {
      return <RecoverBox />;
    } else {
      return <LoginBox />; // Default form is LoginBox if none match
    }
  };

  // RegisterBox component
  function RegisterBox() {
    return (
      <div
        className="form-area w-100 d-flex min-vh-100 justify-content-center align-items-center"
        style={{
          backgroundImage: `url('${bgImg}')`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="form_box">
          <form action="" className="form">
            <div className="row">
              <h2 className="mb-5 text-center form-header">Register</h2>
              <div className="col-lg-6">
                <Input labelText="Username" placeholder="Please Enter Username" />
                <Input labelText="Firstname" placeholder="Please Enter Firstname" />
                <Input labelText="Password" type="password" placeholder="Please Enter Password" />
              </div>
              <div className="col-lg-6">
                <Input labelText="Email" placeholder="Please Enter Email" />
                <Input labelText="Lastname" placeholder="Please Enter Lastname" />
                <Input labelText="Repeat Password" type="password" placeholder="Please Repeat Password" />
              </div>

              <div className="">
                <button type="submit">Register</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // LoginBox component
  function LoginBox() {
    return (
      <div
        className="form-area w-100 d-flex min-vh-100 justify-content-center align-items-center position-relative blur"
        style={{
          backgroundImage: `url('${bgImg}')`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="form_box position-absolute">
          <form action="" className="form">
            <div className="row">
              <h2 className="mb-5 text-center form-header">Login</h2>
              <div className="col-lg-12">
                <Input labelText="Username" placeholder="Please Enter Username" />
                <Input labelText="Password" type="password" placeholder="Please Enter Password" />
              </div>
              <div className="checkbox">
                <input type="checkbox" className="me-2" />
                <span>Remember Me</span>
              </div>
              <div>
                <Link to="/register">Register | </Link>
                <Link to="/recover">Lost Your Password?</Link>
              </div>
              <div className="text-center mt-4">
                <button type="submit">Register</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // RecoverBox component
  function RecoverBox() {
    return (
      <div
        className="form-area w-100 d-flex min-vh-100 justify-content-center align-items-center"
        style={{
          backgroundImage: `url('${bgImg}')`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="form_box">
          <form action="" className="form">
            <div className="row">
              <h2 className="mb-5 text-center form-header">Recover Password</h2>
              <span>Please enter your username or email address. You will receive a link to create a new password via email.</span>
              <div className="col-lg-6">
                <Input labelText="Email" placeholder="Please Enter Your Email" />
              </div>
              <div className="">
                <button type="submit ">Register</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return <section className="form-container">{renderForm()}</section>;
};

export default FormBox;
