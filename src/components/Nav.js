import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FaPoll } from "react-icons/fa";
import UserAvatarPicture from "./UserAvatarPicture";

const Nav = (props) => {
  return (
    <nav className="nav-container">
      {/* TODO: Make the active navigation link highlighed */}
      <div className="container-row">
        <Link to="/" className="nav-item">
          Home
        </Link>
        <Link to="/add" className="nav-item">
          New
        </Link>
        <Link to="/leaderboard" className="nav-item">
          Leaderboard
        </Link>
      </div>

      <div className="container-row">
        {/* This dynamically sets the avatar based on the presence of a URL. */}
        <Link to="/profile">
          <UserAvatarPicture avatarURL={props.authedUserAvatarURL} />
        </Link>
        <Link to="/logout" className="nav-item">
          Logout
        </Link>
        <div className="nav-website-title">
          <i>
            <FaPoll style={{ marginRight: 4 }} />
          </i>
          <span>Web Polls</span>
        </div>
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
