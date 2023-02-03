import questions from "./questions";
import users from "./users";
import authedUser from "./authedUser";
import { loadingBarReducer } from "react-redux-loading-bar";

// Used to combine all reducers

const reducers = {
  questions,
  users,
  loadingBar: loadingBarReducer,
  authedUser,
};

export default reducers;
