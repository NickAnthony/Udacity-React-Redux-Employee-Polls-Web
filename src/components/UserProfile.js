import { connect } from "react-redux";
import { useState } from "react";
import QuestionsTabLayout from "./QuestionsTabLayout";
import { updateUser } from "../actions/users";
import UserAvatarPicture from "./UserAvatarPicture";
import ChangePasswordPopUp from "./ChangePasswordPopUp";

const UserProfile = ({ dispatch, authedUserDetails }) => {
  // Set to true to display information, without being able to edit it (edit is disabled)
  const [displayModeEnabled, setDisplayModeEnabled] = useState(true);
  const [avatarURL, setAvatarURL] = useState(authedUserDetails.avatarURL);
  const [name, setName] = useState(authedUserDetails.name);
  const [password, setPassword] = useState("");
  const [isChangePasswordModelOpen, setIsChangePasswordModelOpen] =
    useState(false);

  const invalidName = name === "" ? true : false;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (invalidName) {
      alert("Your name cannot be empty.");
      return;
    }
    dispatch(updateUser(authedUserDetails.id, password, name, avatarURL));
    setDisplayModeEnabled(true);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setDisplayModeEnabled(true);
    setAvatarURL(authedUserDetails.avatarURL);
    setName(authedUserDetails.name);
    setPassword(authedUserDetails.password);
  };

  const handleUpdateName = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleUpdateAvatarURL = (e) => {
    e.preventDefault();
    setAvatarURL(e.target.value);
  };

  // Manages the change password model logic
  const onCloseChangePasswordModel = () => {
    setIsChangePasswordModelOpen(false);
  };

  return (
    <div className="container-column">
      <div className="container-row user-profile-container">
        <div className="user-profile-column container-column">
          <UserAvatarPicture
            avatarURL={authedUserDetails.avatarURL}
            size={200}
          />
          <h2>{authedUserDetails.name}</h2>
          <h4>{authedUserDetails.username}</h4>
        </div>

        <div className="container-column">
          <ChangePasswordPopUp
            isOpen={isChangePasswordModelOpen}
            onClose={onCloseChangePasswordModel}
          />
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
              value={authedUserDetails.id}
              disabled={true}
              data-testid="username-input"
            />
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
              <div className="button-layout">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setDisplayModeEnabled(false);
                  }}
                  data-testid="display-mode-enable-button"
                >
                  Edit Profile
                </button>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("CHANGE PASSWORD BUTTON2");
                    setIsChangePasswordModelOpen(true);
                  }}
                  data-testid="change-password-button"
                >
                  Change Password
                </button>
              </div>
            )}
            {!displayModeEnabled && (
              <div className="flex-space-between">
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
        <QuestionsTabLayout
          tabs={["My Questions"]}
          questionsPerTab={{ 0: authedUserDetails.questions }}
        />
      </div>
    </div>
  );
};

const mapStateToProps = ({ users, authedUser }) => ({
  authedUser,
  authedUserDetails: users[authedUser],
});

export default connect(mapStateToProps)(UserProfile);
