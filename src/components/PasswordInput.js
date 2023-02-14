import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { useState } from "react";
import PropTypes from "prop-types";

const PasswordInput = ({ password, handleChangePassword }) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  return (
    <div className="password-input-container">
      <input
        type={passwordVisibility ? "text" : "password"}
        value={password}
        onChange={handleChangePassword}
        className="password-input"
        data-testid="password-input"
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

PasswordInput.propTypes = {
  password: PropTypes.string.isRequired,
  handleChangePassword: PropTypes.func.isRequired,
};

export default PasswordInput;
