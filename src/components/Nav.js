import { Link } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { connect } from "react-redux";

const Nav = (props) => {
  return (
    <nav className="nav-container">
      {/* TODO: Make the active navigation link highlighed */}
      <div>
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
      <div>
        {props.authedUserAvatarURL ? (
          <img src={props.authedUserAvatarURL} />
        ) : (
          <BsPersonCircle size={20} style={{ margin: -5, marginRight: 10 }} />
        )}
        <Link to="/" className="nav-item">
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
