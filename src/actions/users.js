export const RECEIVE_USERS = "RECEIVE_USERS";
export const ADD_ANSWER_TO_USER = "ADD_ANSWER_TO_USER";
export const REMOVE_ANSWER_FROM_USER = "REMOVE_ANSWER_FROM_USER";
export const ADD_QUESTION_TO_USER = "ADD_QUESTION_TO_USER";
export const REMOVE_QUESTION_FROM_USER = "REMOVE_QUESTION_FROM_USER";
export const UPDATE_USER = "UPDATE_USER";
export const ADD_NEW_USER = "ADD_NEW_USER";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function addQuestionToUser(questionId, userId) {
  return {
    type: ADD_QUESTION_TO_USER,
    questionId,
    userId,
  };
}

export function removeQuestionFromUser(questionId, userId) {
  return {
    type: REMOVE_QUESTION_FROM_USER,
    questionId,
    userId,
  };
}

export function addAnswerToUser(questionId, userId, voteOption) {
  return {
    type: ADD_ANSWER_TO_USER,
    questionId,
    userId,
    voteOption,
  };
}

export function removeAnswerFromUser(questionId, userId, voteOption) {
  return {
    type: REMOVE_ANSWER_FROM_USER,
    questionId,
    userId,
    voteOption,
  };
}

export function updateUser(userId, name, avatarURL) {
  return {
    type: UPDATE_USER,
    userId,
    name,
    avatarURL,
  };
}

export function createUser(userId, name, avatarURL) {
  return {
    type: ADD_NEW_USER,
    userId,
    name,
    avatarURL,
    impersonable: false,
  };
}
