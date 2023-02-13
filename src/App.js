import "./App.css";
import { connect } from "react-redux";
import { handleInitialData } from "./actions/shared";
import { useEffect, Fragment } from "react";
import LoadingBar from "react-redux-loading-bar";
import Dashboard from "./components/Dashboard";
import { setAuthedUser } from "./actions/authedUser";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import CreateQuestion from "./components/CreateQuestion";
import Leaderboard from "./components/Leaderboard";
import Question from "./components/Question";
import Login from "./components/Login";
import UserProfile from "./components/UserProfile";
import { useNavigate } from "react-router-dom";
import CreateUser from "./components/CreateUser";

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
        {/* // TODO: Remove nav from Login screen  */}
        {props.authedUser && <Nav />}
        {props.loading === true ? null : (
          <Routes>
            <Route path="/" exact element={<Dashboard />} />
            <Route path="/new" exact element={<CreateQuestion />} />
            <Route path="/leaderboard" exact element={<Leaderboard />} />
            <Route path="/poll/:id" element={<Question />} />
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
  authedUser,
  users,
  questions,
});

export default connect(mapStateToProps)(App);
