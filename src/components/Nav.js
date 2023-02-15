import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FaPoll } from "react-icons/fa";
import UserAvatarPicture from "./UserAvatarPicture";

const Nav = ({ authedUser, authedUserAvatarURL }) => {
  return (
    <nav className="nav-container">
      {/* TODO: Make the active navigation link highlighed */}
      {authedUser && (
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
      )}
      {!authedUser && (
        <div className="container-row">
          <Link to="/login" className="nav-item">
            Login
          </Link>
        </div>
      )}

      <div className="container-row">
        {authedUser && (
          <div>
            <Link to="/profile">
              <UserAvatarPicture avatarURL={authedUserAvatarURL} />
            </Link>
          </div>
        )}
        {authedUser && (
          <Link to="/login" className="nav-item">
            Logout
          </Link>
        )}

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
    authedUser,
    authedUserAvatarURL: authedUser ? users[authedUser].avatarURL : null,
  };
};
export default connect(mapStateToProps)(Nav);
