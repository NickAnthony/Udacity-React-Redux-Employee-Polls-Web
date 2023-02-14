import "../styles/App.css";
import { connect } from "react-redux";
import { useEffect, Fragment } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { handleInitialData } from "../actions/shared";
import CreateQuestion from "./CreateQuestion";
import CreateUser from "./CreateUser";
import Dashboard from "./Dashboard";
import Leaderboard from "./Leaderboard";
import LoadingBar from "react-redux-loading-bar";
import Login from "./Login";
import Nav from "./Nav";
import Question from "./Question";
import UserProfile from "./UserProfile";

function App(props) {
  const navigate = useNavigate();
  // Load the initial user and question data asynchronously via useEffect
  useEffect(() => {
    props.dispatch(handleInitialData());
    // If no one is logged in, we want to return to the login screen.
    if (!props.authedUser) {
      navigate("/login");
    }
  }, []);

  return (
    <Fragment>
      <LoadingBar style={{ backgroundColor: "#e98074" }} />
      <div className="container">
        {props.authedUser && <Nav />}
        {props.loading === true ? null : (
          <Routes>
            <Route path="/" exact element={<Dashboard />} />
            <Route path="/add" exact element={<CreateQuestion />} />
            <Route path="/leaderboard" exact element={<Leaderboard />} />
            <Route path="/questions/:id" element={<Question />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Login />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/user/new" element={<CreateUser />} />
          </Routes>
        )}
      </div>
    </Fragment>
  );
}

const mapStateToProps = ({ authedUser, users, questions }) => ({
  // Loading state is when we have no state!
  loading:
    Object.keys(users).length === 0 && Object.keys(questions).length === 0,
  authedUser,
  users,
  questions,
});

export default connect(mapStateToProps)(App);
