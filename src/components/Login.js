import { connect } from "react-redux";
import { useEffect } from "react";
import { setAuthedUser } from "../actions/authedUser";
import { useState } from "react";
import users from "../reducers/users";
import { withRouter } from "../utils/helpers";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { Link } from "react-router-dom";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSignInHelp, setShowSignInHelp] = useState(false);

  // Logout by default when visiting this page
  useEffect(() => {
    props.dispatch(setAuthedUser(""));
  }, []);

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
    if (!props.users[username]) {
      setShowSignInHelp(true);
      return;
    }
    // Username exists, let's check the password.
    if (props.users[username].password === password) {
      props.dispatch(showLoading());
      props.dispatch(setAuthedUser(username));
      props.dispatch(hideLoading());
      props.router.navigate("/");
      setShowSignInHelp(false);
    }

    // Sign in failed, show help.
    setShowSignInHelp(true);
    return;
  };

  return (
    <div className="container-column login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Welcome to Web Polls!</h1>
        <h2>Login</h2>
        <p>Username</p>
        <input type="text" value={username} onChange={handleChangeUsername} />
        <p>Password</p>
        <input
          type="password"
          value={password}
          onChange={handleChangePassword}
        />
        <br />
        <br />
        <button
          className="btn"
          type="submit"
          disabled={username === "" || password === ""}
        >
          Submit
        </button>
        {showSignInHelp && (
          <p className="sign-in-help">
            Sign in failed... maybe you're looking to{" "}
            <Link to="/new-user">create a profile</Link>?
          </p>
        )}
      </form>
    </div>
  );
};

const mapStateToProps = ({ users }) => ({ users });

export default withRouter(connect(mapStateToProps)(Login));
