import { connect } from "react-redux";
import { useState } from "react";
import { setAuthedUser } from "../actions/authedUser";
import { withRouter } from "../utils/helpers";
import { createUser } from "../actions/users";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import PasswordInput from "./PasswordInput";
import UserAvatarPicture from "./UserAvatarPicture";

const CreateUser = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatarURL, setAvatarURL] = useState("");
  const [name, setName] = useState("");
  const [availableUserName, setAvailableUserName] = useState(true);

  const handleChangeUsername = (e) => {
    // Updates the name and double checks the username does
    // not yet exit.
    e.preventDefault();
    const newUsername = e.target.value;
    setUsername(newUsername);
    if (props.users[newUsername]) {
      setAvailableUserName(false);
    } else {
      setAvailableUserName(true);
    }
  };
  const handleChangePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };
  const handleChangeAvatarURL = (e) => {
    e.preventDefault();
    setAvatarURL(e.target.value);
  };
  const handleChangeName = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };
  const handleNavigateBack = (e) => {
    e.preventDefault();
    props.router.navigate("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // If the username does not exist, return.
    if (props.users[username]) {
      setAvailableUserName(false);
      return;
    }
    props.dispatch(createUser(username, password, name, avatarURL));
    props.dispatch(setAuthedUser(username));
    props.router.navigate("/");
    return;
  };

  return (
    <div className="create-user-profile-container">
      <form onSubmit={handleSubmit}>
        <h1>Create a profile</h1>

        <p>Full Name</p>
        <input type="text" value={name} onChange={handleChangeName} />
        <p>Username</p>
        <input type="text" value={username} onChange={handleChangeUsername} />
        {availableUserName && username !== "" && (
          <i>
            <AiOutlineCheckCircle color="#72BD7A" />
          </i>
        )}
        {!availableUserName && username !== "" && (
          <i>
            <RxCross2 color="#e85a4f" />
            <span style={{ color: "#e85a4f" }}> Username taken</span>
          </i>
        )}
        <p>Password</p>
        <PasswordInput
          password={password}
          handleChangePassword={handleChangePassword}
        />
        <p>Profile Picture URL</p>
        <input type="text" value={avatarURL} onChange={handleChangeAvatarURL} />
        <p />
        <UserAvatarPicture avatarURL={avatarURL} size={100} />
        <br />
        <br />
        <div className="flex-space-between">
          <button type="submit" disabled={username === "" || password === ""}>
            Submit
          </button>
          <button onClick={handleNavigateBack}>Back to Login</button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = ({ users }) => ({ users });

export default withRouter(connect(mapStateToProps)(CreateUser));
