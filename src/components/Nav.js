import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="nav-container">
      <Link to="/" className="nav-item">
        Home
      </Link>
      <Link to="/new" className="nav-item">
        New
      </Link>
      <Link to="/leaderboard" className="nav-item">
        Leaderboard
      </Link>
    </nav>
  );
};

export default Nav;
