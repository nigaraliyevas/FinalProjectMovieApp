import { Link, useNavigate } from "react-router-dom";
import Input from "../Input/Input";
import "./LoginForm.css";
import { useState } from "react";
import { useLoginMutation } from "../../features/auth/authApi";

const FormBox = ({ bgImg }) => {
  // State for form fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [login, { isLoading, isError, error }] = useLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const { token } = await login({ username, password, rememberMe }).unwrap();
      if (rememberMe) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token); 
      }
      navigate("/"); 
    } catch (err) {
      console.error("Login failed: ", err);
    }
  };

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
        <form onSubmit={handleSubmit} action="" className="form">
          <div className="row">
            <h2 className="mb-5 text-center form-header py-3">Login</h2>
            <div className="col-lg-12">
              <Input onChange={e => setUsername(e.target.value)} name="username" labelText="Username" placeholder="Please Enter Username" />
              <Input onChange={e => setPassword(e.target.value)} name={"password"} labelText="Password" type="password" placeholder="Please Enter Password" />
            </div>
            <div className="checkbox mb-3">
              <input type="checkbox" className="me-2" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
              <span>Remember Me</span>
            </div>
            <div>
              <span>Don't have an account? | </span>
              <Link to="/register">Register </Link>
            </div>
            <div className="text-center mt-4">
              <button type="submit" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </button>
              {isError && <p>Error: {error?.data?.message || "Login failed"}</p>}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default FormBox;
