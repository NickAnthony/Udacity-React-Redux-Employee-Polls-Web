import { Link } from "react-router-dom";
import { connect } from "react-redux";
import DefaultAvatar from "../images/DefaultAvatar.png";
import { FaPoll } from "react-icons/fa";

const Nav = (props) => {
  return (
    <nav className="nav-container">
      {/* TODO: Make the active navigation link highlighed */}
      <div className="container-row">
        <div className="nav-website-title">
          <i>
            <FaPoll style={{ marginRight: 4 }} />
          </i>
          <span>Web Polls</span>
        </div>
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

      <div className="container-row">
        {/* This dynamically sets the avatar based on the presence of a URL. */}
        <Link to="/profile">
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
        </Link>
        <Link to="/logout" className="nav-item">
          Logout
        </Link>
      </div>
    </nav>
  );
};
const mapStateToProps = ({ authedUser, users }) => {
  return {
    authedUserAvatarURL: authedUser ? users[authedUser].avatarURL : null,
  };
};
export default connect(mapStateToProps)(Nav);
