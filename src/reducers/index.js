import questions from "./questions";
import users from "./users";
import { loadingBarReducer } from "react-redux-loading-bar";

// Used to combine all reducers

const reducers = {
  questions,
  users,
  loadingBar: loadingBarReducer,
};

export default reducers;
