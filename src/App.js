import "./App.css";
import { connect } from "react-redux";
import { handleInitialData } from "./actions/shared";
import { useEffect, Fragment } from "react";
import LoadingBar from "react-redux-loading-bar";
import Dashboard from "./components/Dashboard";
import { setAuthedUser } from "./actions/authedUser";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import CreatePoll from "./components/CreatePoll";

function App(props) {
  // Load the initial user and question data asynchronously via useEffect
  useEffect(() => {
    props.dispatch(handleInitialData());
    props.dispatch(setAuthedUser("sarahedo"));
  }, [props]);

  return (
    <Fragment>
      <LoadingBar />
      <div className="container">
        <Nav />
        {props.loading === true ? null : (
          <Routes>
            <Route path="/" exact element={<Dashboard />} />
            <Route path="/new" exact element={<CreatePoll />} />
          </Routes>
        )}
      </div>
    </Fragment>
  );
}

export default connect()(App);
