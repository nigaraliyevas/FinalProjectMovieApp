import { useState } from "react";
import "./Input.css";

const Input = ({ labelText, type = "text", placeholder, value, onChange, name }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="input-group">
      {labelText && <label className="input-label">{labelText}</label>}
      <input name={name} className="input" type={type === "password" && showPassword ? "text" : type} onChange={onChange} placeholder={placeholder} />
      {type === "password" && (
        <span className="toggle-password" onClick={togglePasswordVisibility}>
          {showPassword ? <img src="/public/assets/img/PasswordIcon.svg" alt="" /> : <img src="/public/assets/img/PasswordIcon2.svg" alt="" />}
        </span>
      )}
    </div>
  );
};

export default Input;
