import { Link, useLocation, useNavigate } from "react-router-dom";
import Input from "../Input/Input";
import "./RegisterForm.css";
import { useState } from "react";
import { useRegisterUserMutation } from "../../features/auth/authApi";

const FormBox = ({ bgImg }) => {
  const location = useLocation();
  const address = location.pathname;
  const navigate = useNavigate();

  // State for form fields
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setrepassword] = useState("");
  const [subscriptionPlanId, setSubscriptionPlanId] = useState(1);
  const [image, setProfileImage] = useState(null);

  const [registerUser, { isLoading, isSuccess, isError, error }] = useRegisterUserMutation();

  const photoUpload = e => {
    const reader = new FileReader();
    const file = e.target.files[0];
    if (reader && file) {
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };
  const formData = {
    fullname,
    username,
    email,
    password,
    rePassword,
    subscriptionPlanId,
    image,
  };
  const handleSubmit = async event => {
    event.preventDefault();
    console.log(formData);
    try {
      const response = await registerUser(formData).unwrap();
      console.log("Registration successful: ", response);
      navigate("/login");
    } catch (err) {
      console.error("Registration failed: ", err);
    }
  };
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
          <form action="" className="form" encType="multipart/form-data">
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
                <button type="submit">Login</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // RecoverBox component
  // function RecoverBox() {
  //   return (
  //     <div
  //       className="form-area w-100 d-flex min-vh-100 justify-content-center align-items-center"
  //       style={{
  //         backgroundImage: `url('${bgImg}')`,
  //         backgroundPosition: "center",
  //         backgroundRepeat: "no-repeat",
  //         backgroundSize: "cover",
  //       }}
  //     >
  //       <div className="form_box">
  //         <form action="" className="form">
  //           <div className="row">
  //             <h2 className="mb-5 text-center form-header">Recover Password</h2>
  //             <span>Please enter your username or email address. You will receive a link to create a new password via email.</span>
  //             <div className="col-lg-6">
  //               <Input labelText="Email" placeholder="Please Enter Your Email" />
  //             </div>
  //             <div className="">
  //               <button type="submit ">Recover</button>
  //             </div>
  //           </div>
  //         </form>
  //       </div>
  //     </div>
  //   );
  // }
  if (isError && error.message == "ERR_HTTP2_PROTOCOL_ERROR") {
    // Redirect to login page in case of HTTP/2 error
    navigate("/login");
  }

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
        <form className="form" onSubmit={handleSubmit}>
          <div className="row">
            <h2 className="mb-5 text-center form-header">Register</h2>
            <div className="col-lg-6">
              <Input
                onChange={e => {
                  setFullname(e.target.value);
                }}
                name={"fullname"}
                labelText="Fullname"
                placeholder="Please Enter FullName"
              />
              <Input
                onChange={e => {
                  setUsername(e.target.value);
                }}
                name={"username"}
                labelText="Username"
                placeholder="Please Enter Username"
                value={username}
              />
              <Input
                onChange={e => {
                  setEmail(e.target.value);
                }}
                name={"email"}
                labelText="Email"
                type="email"
                placeholder="Please Enter Email"
                value={email}
              />
              <label>Profile Image</label>
              <input name="image" type="file" accept="image/*" onChange={photoUpload} />
              {image && <img width={250} height={250} src={image} alt="Profile preview" />}
            </div>
            <div className="col-lg-6">
              <Input
                onChange={e => {
                  setPassword(e.target.value);
                }}
                name={"password"}
                labelText="Password"
                type="password"
                placeholder="Please Enter Password"
                value={password}
              />
              <Input
                onChange={e => {
                  setrepassword(e.target.value);
                }}
                name={"rePassword"}
                labelText="Repeat Password"
                type="password"
                placeholder="Please Repeat Password"
                value={rePassword}
              />
            </div>
            {isError && <p className="error">{error.message}</p>}
            {isSuccess && <p className="success">Registration Successful!</p>}
            <div className="">
              <button type="submit" disabled={isLoading}>
                {isLoading ? "Registering..." : "Register"}
              </button>
              {isError && <p>Error: {error.message}</p>}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default FormBox;
