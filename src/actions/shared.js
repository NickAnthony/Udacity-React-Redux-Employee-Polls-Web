import { showLoading, hideLoading } from "react-redux-loading-bar";
import { _getUsers } from "../utils/_DATA";
import { _getQuestions } from "../utils/_DATA";
import { addAnswerToUser, receiveUsers } from "./users";
import { addUserToAnswer, receiveQuestions } from "./questions";

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(hideLoading());
    });
  };
}

async function getInitialData() {
  const users = await _getUsers();
  const questions = await _getQuestions();
  return { users, questions };
}

export function handleUserVote(questionId, userId, voteOption) {
  return (dispatch) => {
    dispatch(showLoading());
    dispatch(addAnswerToUser(questionId, userId, voteOption));
    dispatch(addUserToAnswer(questionId, userId, voteOption));
    dispatch(hideLoading());
  };
}
