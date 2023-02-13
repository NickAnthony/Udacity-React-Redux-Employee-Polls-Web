import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { useState } from "react";

const PasswordInput = ({ password, handleChangePassword }) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  return (
    <div className="password-input-container">
      <input
        type={passwordVisibility ? "text" : "password"}
        value={password}
        onChange={handleChangePassword}
        className="password-input"
      />
      <i
        className="password-vis-icon "
        onClick={(e) => {
          setPasswordVisibility(!passwordVisibility);
        }}
      >
        {!passwordVisibility && <MdOutlineVisibilityOff />}
        {passwordVisibility && <MdOutlineVisibility />}
      </i>
    </div>
  );
};

export default PasswordInput;
