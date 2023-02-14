import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "../utils/helpers";
import { setAuthedUser } from "../actions/authedUser";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import PasswordInput from "./PasswordInput";

const Login = ({ dispatch, users, router, location }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSignInHelp, setShowSignInHelp] = useState(false);

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
    if (users[username].password === password) {
      dispatch(showLoading());
      dispatch(setAuthedUser(username));
      dispatch(hideLoading());
      router.navigate(location);
      setShowSignInHelp(false);
    }

    // Sign in failed, show help.
    setShowSignInHelp(true);
  };

  return (
    <div className="outer-center-container">
      <div className="container-column login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Welcome to Web Polls!</h1>
          <h2>Login</h2>
          <p>Username</p>
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
          <br />
          <br />
          <button
            className="btn"
            type="submit"
            disabled={username === "" || password === ""}
            data-testid="submit-button"
          >
            Submit
          </button>
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
  let location = props.router.location.pathname;
  if (location === "/logout" || location === "/login") {
    location = "/";
  }
  return {
    users,
    location: location,
  };
};

export default withRouter(connect(mapStateToProps)(Login));
