import { connect } from "react-redux";
import { useState } from "react";
import QuestionsLayout from "./QuestionsLayout";
import { updateUser } from "../actions/users";
import UserAvatarPicture from "./UserAvatarPicture";

const UserProfile = (props) => {
  // Set to true to display information, without being able to edit it (edit is disabled)
  const [displayModeEnabled, setDisplayModeEnabled] = useState(true);
  const [avatarURL, setAvatarURL] = useState(props.authedUserDetails.avatarURL);
  const [name, setName] = useState(props.authedUserDetails.name);
  const [password, setPassword] = useState(props.authedUserDetails.password);

  const invalidName = name === "" ? true : false;
  const invalidPass = password.length < 6 ? true : false;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (invalidName || invalidPass) {
      alert("Please fix the errors before saving your changes.");
      return;
    }
    props.dispatch(
      updateUser(props.authedUserDetails.id, password, name, avatarURL)
    );
    setDisplayModeEnabled(true);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setDisplayModeEnabled(true);
    setAvatarURL(props.authedUserDetails.avatarURL);
    setName(props.authedUserDetails.name);
    setPassword(props.authedUserDetails.password);
  };

  const handleUpdateName = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleUpdateAvatarURL = (e) => {
    e.preventDefault();
    setAvatarURL(e.target.value);
  };

  return (
    <div className="container-column">
      <div className="container-row user-profile-container">
        <div className="user-profile-column container-column">
          <UserAvatarPicture
            avatarURL={props.authedUserDetails.avatarURL}
            size={200}
          />
          <h2>{props.authedUserDetails.name}</h2>
          <h4>{props.authedUserDetails.username}</h4>
        </div>

        <div className="container-column">
          <form onSubmit={handleSubmit}>
            <p>Full Name</p>
            <input
              type="text"
              value={name}
              disabled={displayModeEnabled}
              onChange={handleUpdateName}
              data-testid="full-name-input"
            />
            <br />
            <span style={{ color: "#E85A4F", fontSize: "small" }}>
              {invalidName && "Name cannot be empty"}
            </span>
            <p>Username (cannot be edited)</p>
            <input
              type="text"
              value={props.authedUserDetails.id}
              disabled={true}
              data-testid="username-input"
            />
            <p>Password</p>
            <input
              type="password"
              value={password}
              disabled={displayModeEnabled}
              onChange={handleUpdatePassword}
              data-testid="password-input"
            />
            <br />
            <span style={{ color: "#E85A4F", fontSize: "small" }}>
              {invalidPass && "Password must be at least 6 characters"}
            </span>
            <p>Profile Photo Link</p>
            <input
              type="text"
              value={avatarURL}
              disabled={displayModeEnabled}
              onChange={handleUpdateAvatarURL}
              data-testid="profile-photo-input"
            />
            <br />
            <br />
            {displayModeEnabled && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setDisplayModeEnabled(false);
                }}
                data-testid="display-mode-enable-button"
              >
                Edit Profile
              </button>
            )}
            {!displayModeEnabled && (
              <div>
                <button type="submit" data-testid="submit-button">
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  data-testid="display-mode-cancel-button"
                >
                  Cancel
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
      <div className="user-profile-questions-container">
        <QuestionsLayout
          title={"My Questions"}
          questionIds={props.authedUserDetails.questions}
        />
      </div>
    </div>
  );
};

const mapStateToProps = ({ users, authedUser, questions }) => ({
  authedUser,
  authedUserDetails: users[authedUser],
  questions,
});

export default connect(mapStateToProps)(UserProfile);
