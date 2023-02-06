import {
  RECEIVE_QUESTIONS,
  ADD_QUESTION,
  ADD_USER_TO_ANSWER,
} from "../actions/questions";

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question,
      };
    case ADD_USER_TO_ANSWER:
      // Create a copy of the question object we want to modify.
      let question = {
        ...state[action.questionId],
      };
      // Push in the new usernames
      if (action.voteOption === 1) {
        question.optionOne.votes.push(action.userId);
      } else {
        question.optionTwo.votes.push(action.userId);
      }
      // Return that new object in replace of the existing object.
      return {
        ...state,
        [action.questionId]: question,
      };
    default:
      return state;
  }
}
