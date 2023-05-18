import { showLoading, hideLoading } from "react-redux-loading-bar";
import {
  addAnswerToUser,
  addQuestionToUser,
  receiveUsers,
  removeAnswerFromUser,
} from "./users";
import {
  addQuestion,
  addUserToAnswer,
  receiveQuestions,
  removeUserFromAnswer,
} from "./questions";
import axios from "axios";

export const API_URL = "http://127.0.0.1:3001";

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());
    return axios
      .all([axios.get(`${API_URL}/users`), axios.get(`${API_URL}/questions`)])
      .then(
        axios.spread((usersRes, questionsRes) => {
          dispatch(receiveUsers(usersRes.data.users));
          dispatch(receiveQuestions(questionsRes.data.questions));
        })
      )
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(hideLoading());
      });
  };
}

export function handleUserVote(questionId, userId, voteOption) {
  return (dispatch) => {
    dispatch(showLoading());
    dispatch(addAnswerToUser(questionId, userId, voteOption));
    dispatch(addUserToAnswer(questionId, userId, voteOption));
    dispatch(hideLoading());
  };
}

export function handleRemoveUserVote(questionId, userId, voteOption) {
  return (dispatch) => {
    dispatch(showLoading());
    dispatch(removeAnswerFromUser(questionId, userId, voteOption));
    dispatch(removeUserFromAnswer(questionId, userId, voteOption));
    dispatch(hideLoading());
  };
}

export function handleAddQuestion(question) {
  return (dispatch) => {
    dispatch(addQuestion(question));
    dispatch(addQuestionToUser(question.id, question.author));
  };
}
