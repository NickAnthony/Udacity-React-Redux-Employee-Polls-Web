export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_USER_TO_ANSWER = "ADD_USER_TO_ANSWER";
export const REMOVE_USER_FROM_ANSWER = "REMOVE_USER_FROM_ANSWER";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function addUserToAnswer(questionId, userId, voteOption) {
  return {
    type: ADD_USER_TO_ANSWER,
    questionId,
    userId,
    voteOption,
  };
}

export function removeUserFromAnswer(questionId, userId, voteOption) {
  return {
    type: REMOVE_USER_FROM_ANSWER,
    questionId,
    userId,
    voteOption,
  };
}
