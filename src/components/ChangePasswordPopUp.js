import React, { useState } from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import { API_URL } from "../actions/shared";
import axios from "axios";
import { updateUser } from "../actions/users";
import ReactLoading from "react-loading";

Modal.setAppElement("#root");

function ChangePasswordPopup({
  isOpen,
  onClose,
  authedUser,
  authedUserDetails,
  dispatch,
}) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [showWrongPasswordError, setShowWrongPasswordError] = useState(false);

  const showConfirmError = newPassword !== confirmPassword;

  function handleSubmit(event) {
    event.preventDefault();
    if (showConfirmError || newPassword === "") {
      return;
    }
    setShowLoading(true);
    return axios
      .patch(`${API_URL}/users`, {
        username: authedUser,
        old_password: oldPassword,
        new_password: newPassword,
      })
      .then(() => {
        dispatch(
          updateUser(
            authedUser,
            newPassword,
            authedUserDetails.name,
            authedUserDetails.avatarURL
          )
        );
        // Reset fields
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        // Close this model popup
        onClose();
      })
      .catch((error) => {
        switch (error.response.status) {
          case 401:
            alert("Wrong old password.  Please try again.");
            break;
          default:
            alert(
              "There was an error when trying to save your profile.  Please try again."
            );
        }
        setShowWrongPasswordError(true);
      })
      .finally(() => {
        setShowLoading(false);
      });
  }

  const handleOnClose = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowWrongPasswordError(false);
    setShowLoading(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleOnClose}
      contentLabel="Change Password"
      className="Modal"
      overlayClassName="modal-overlay"
    >
      <h2>Change Password</h2>
      {showLoading && (
        <div className="container">
          <ReactLoading type={"spinningBubbles"} color="#e98074" />
        </div>
      )}
      {!showLoading && (
        <form onSubmit={handleSubmit} className="modal-form">
          <label>
            Old Password
            <input
              type="password"
              value={oldPassword}
              onChange={(event) => {
                setShowWrongPasswordError(false);
                setOldPassword(event.target.value);
              }}
            />
          </label>
          <span style={{ color: "#E85A4F", fontSize: "small" }}>
            {showWrongPasswordError && "Incorrect old password"}
          </span>
          <label>
            New Password
            <input
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
            />
          </label>
          <label>
            Confirm New Password
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </label>
          <span style={{ color: "#E85A4F", fontSize: "small" }}>
            {showConfirmError && "Confirmation password doesn't match"}
          </span>
          <button type="submit" disabled={showConfirmError}>
            Change Password
          </button>
          <button onClick={handleOnClose}>Cancel</button>
        </form>
      )}
    </Modal>
  );
}

const mapStateToProps = (
  { users, authedUser, dispatch },
  { isOpen, onClose }
) => ({
  isOpen,
  onClose,
  authedUser,
  authedUserDetails: users[authedUser],
  dispatch,
});

export default connect(mapStateToProps)(ChangePasswordPopup);
