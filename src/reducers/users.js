import {
  RECEIVE_USERS,
  ADD_ANSWER_TO_USER,
  ADD_QUESTION_TO_USER,
  UPDATE_USER,
  ADD_NEW_USER,
} from "../actions/users";

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    case ADD_ANSWER_TO_USER:
      // Create a copy of the user object we want to modify.
      let user = {
        ...state[action.userId],
      };
      // Push in the new answers to the answers part of the object.
      if (action.voteOption === 1) {
        user.answers[action.questionId] = "optionOne";
      } else {
        user.answers[action.questionId] = "optionTwo";
      }
      // Return that new object in replace of the existing object.
      return {
        ...state,
        [action.userId]: user,
      };
    case ADD_QUESTION_TO_USER:
      return {
        ...state,
        [action.userId]: {
          ...state[action.userId],
          questions: state[action.userId].questions.concat([action.questionId]),
        },
      };
    case UPDATE_USER: {
      return {
        ...state,
        [action.userId]: {
          ...state[action.userId],
          password: action.password,
          name: action.name,
          avatarURL: action.avatarURL,
        },
      };
    }
    case ADD_NEW_USER: {
      return {
        ...state,
        [action.userId]: {
          id: action.userId,
          password: action.password,
          name: action.name,
          avatarURL: action.avatarURL,
          answers: {},
          questions: [],
        },
      };
    }
    default:
      return state;
  }
}
