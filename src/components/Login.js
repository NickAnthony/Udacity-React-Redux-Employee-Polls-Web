import { connect } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "../utils/helpers";
import { setAuthedUser } from "../actions/authedUser";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import PasswordInput from "./PasswordInput";
import axios from "axios";
import { API_URL } from "../actions/shared";
import { RxCross2 } from "react-icons/rx";

const Login = ({
  dispatch,
  users,
  userIds,
  impersonableUsers,
  router,
  redirectTo,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSignInHelp, setShowSignInHelp] = useState(false);
  const [showImpersonateHelp, setShowImpersonateHelp] = useState(false);
  const [impersonate, setImpersonate] = useState(false);

  // Logout by default when visiting this page
  useEffect(() => {
    dispatch(setAuthedUser(""));
  }, [dispatch]);

  const handleChangeUsername = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };
  const handleChangePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // If the username does not exist, return.
    if (!users[username]) {
      setShowSignInHelp(true);
      return;
    }
    // Username exists, let's check the password.
    // Note that we won't check an empty password!  This is according
    // to project specs.
    dispatch(showLoading());
    if (impersonate) {
      await axios
        .post(`${API_URL}/login`, {
          username: username,
          impersonate: true,
        })
        .then((response) => {
          if (response.data.success) {
            dispatch(setAuthedUser(username));
            router.navigate(redirectTo);
            setShowImpersonateHelp(false);
          } else {
            // Sign in failed, show help.
            setShowImpersonateHelp(true);
          }
        })
        .catch((error) => {
          console.log(error);
          alert(
            "There was an error when trying to login to your profile.  Please try again."
          );
        })
        .finally(() => {
          dispatch(hideLoading());
        });
    } else {
      await axios
        .post(`${API_URL}/login`, {
          username: username,
          password: password,
        })
        .then((response) => {
          if (response.data.success) {
            dispatch(setAuthedUser(username));
            router.navigate(redirectTo);
            setShowSignInHelp(false);
          } else {
            // Sign in failed, show help.
            setShowSignInHelp(true);
          }
        })
        .catch((error) => {
          console.log(error);
          alert(
            "There was an error when trying to login to your profile.  Please try again."
          );
        })
        .finally(() => {
          dispatch(hideLoading());
        });
    }
  };

  const changeImpersonate = (e) => {
    e.preventDefault();
    if (impersonate) {
      setUsername("");
    } else {
      setUsername(userIds[0]);
    }
    setImpersonate(!impersonate);
  };

  return (
    <div className="outer-center-container">
      <div className="container-column login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Welcome to Web Polls!</h1>
          <h2>Login</h2>
          <p>Username</p>
          {impersonate && (
            <select
              value={username}
              onChange={handleChangeUsername}
              data-testid="username-select"
            >
              {impersonableUsers.map((userId) => (
                <option key={userId} value={userId}>
                  {userId}
                </option>
              ))}
            </select>
          )}
          {!impersonate && (
            <Fragment>
              <input
                type="text"
                value={username}
                onChange={handleChangeUsername}
                data-testid="username-input"
              />
              <p>Password</p>
              <PasswordInput
                password={password}
                handleChangePassword={handleChangePassword}
              />
            </Fragment>
          )}
          {showImpersonateHelp && (
            <i>
              <RxCross2 color="#e85a4f" />
              <span style={{ color: "#e85a4f" }}>
                {" "}
                {username} cannot be impersonated.
              </span>
            </i>
          )}
          <br />
          <br />
          <div className="flex-space-between">
            <button className="btn" type="submit" data-testid="submit-button">
              Submit
            </button>
            <button
              className="btn"
              data-testid="impersonate-button"
              onClick={changeImpersonate}
            >
              {impersonate ? "Back to Regular Sign In" : "Impersonate a User"}
            </button>
          </div>

          {!showSignInHelp && (
            <p className="sign-in-help" data-testid="create-profile-help">
              New to Web Polls? <Link to="/user/new">Create a profile</Link>
            </p>
          )}
          {showSignInHelp && (
            <p className="sign-in-help" data-testid="signin-failed-help">
              Sign in failed... <br />
              maybe you're looking to{" "}
              <Link to="/user/new">create a new profile</Link>?
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = ({ users }, props) => {
  let redirectTo = props.router.location.state
    ? props.router.location.state.redirectTo
    : "/";
  if (redirectTo === "/login") {
    redirectTo = "/";
  }
  let impersonableUsers = Object.keys(users).filter(
    (userId) => users[userId].impersonable
  );

  return {
    users,
    userIds: Object.keys(users),
    impersonableUsers,
    redirectTo: redirectTo,
  };
};

export default withRouter(connect(mapStateToProps)(Login));
