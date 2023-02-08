import { Link } from "react-router-dom";
import { connect } from "react-redux";
import DefaultAvatar from "../images/DefaultAvatar.png";

const Nav = (props) => {
  return (
    <nav className="nav-container">
      {/* TODO: Make the active navigation link highlighed */}
      {props.authedUser && (
        <div className="container-row">
          <Link to="/" className="nav-item">
            Home
          </Link>
          <Link to="/new" className="nav-item">
            New
          </Link>
          <Link to="/leaderboard" className="nav-item">
            Leaderboard
          </Link>
        </div>
      )}
      {!props.authedUser && (
        <div>
          <Link to="/login" className="nav-item">
            Login
          </Link>
        </div>
      )}
      <div className="container-row">
        {/* This dynamically sets the avatar based on the presence of a URL. */}
        <div
          className="profile-avatar"
          style={{
            backgroundImage: `url(${
              props.authedUserAvatarURL
                ? props.authedUserAvatarURL
                : DefaultAvatar
            })`,
          }}
        />
        <Link to="/logout" className="nav-item">
          Logout
        </Link>
      </div>
    </nav>
  );
};
const mapStateToProps = ({ authedUser, users }) => {
  return {
    authedUser,
    authedUserAvatarURL: authedUser ? users[authedUser].avatarURL : null,
  };
};
export default connect(mapStateToProps)(Nav);
