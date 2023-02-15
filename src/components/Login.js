import { connect } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "../utils/helpers";
import { setAuthedUser } from "../actions/authedUser";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import PasswordInput from "./PasswordInput";

const Login = ({ dispatch, users, userIds, router, redirectTo }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSignInHelp, setShowSignInHelp] = useState(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // If the username does not exist, return.
    if (!users[username]) {
      setShowSignInHelp(true);
      return;
    }
    // Username exists, let's check the password.
    // Note that we won't check an empty password!  This is according
    // to project specs.
    if (impersonate || users[username].password === password) {
      dispatch(showLoading());
      dispatch(setAuthedUser(username));
      dispatch(hideLoading());
      router.navigate(redirectTo);
      setShowSignInHelp(false);
    }
    // Sign in failed, show help.
    setShowSignInHelp(true);
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
              {userIds.map((userId) => (
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
  return {
    users,
    userIds: Object.keys(users),
    redirectTo: redirectTo,
  };
};

export default withRouter(connect(mapStateToProps)(Login));
