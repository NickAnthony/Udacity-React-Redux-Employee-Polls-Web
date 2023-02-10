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

function App(props) {
  // Load the initial user and question data asynchronously via useEffect
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);

  return (
    <Fragment>
      <LoadingBar style={{ backgroundColor: "#e98074" }} />
      <div className="container">
        <Nav />
        {props.loading === true ? null : (
          <Routes>
            <Route path="/" exact element={<Dashboard />} />
            <Route path="/new" exact element={<CreateQuestion />} />
            <Route path="/leaderboard" exact element={<Leaderboard />} />
            <Route path="/poll/:id" element={<Question />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Login />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        )}
      </div>
    </Fragment>
  );
}

export default connect()(App);
