import { connect } from "react-redux";
import { BsPersonCircle } from "react-icons/bs";
import { withRouter } from "../utils/helpers";
import { handleUserVote } from "../actions/shared";

const Question = (props) => {
  const handleClick = (e) => {
    e.preventDefault();
    props.dispatch(
      handleUserVote(
        props.question.id,
        props.authedUserDetails.id,
        e.target.value
      )
    );
  };

  return (
    <div className="container">
      <h3>Poll by {props.authedUserDetails.id}</h3>
      {props.authedUserDetails.avatarURL ? (
        <img src={props.authedUserDetails.avatarURL} className="profile" />
      ) : (
        <BsPersonCircle className="profile" size={100} />
      )}
      <h3>Would You Rather...</h3>
      <div className="container-row">
        <div className="container-column question-option-container">
          <span className="question-option">
            {props.question.optionOne.text}
          </span>
          <button
            className="question-answer-btn"
            value={1}
            onClick={handleClick}
          >
            Vote
          </button>
        </div>
        <div className="container-column question-option-container">
          <span className="question-option">
            {props.question.optionTwo.text}
          </span>
          <button
            className="question-answer-btn"
            value={2}
            onClick={handleClick}
          >
            Vote
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ questions, authedUser, users }, props) => {
  const { id } = props.router.params;

  return {
    question: questions[id],
    authedUserDetails: users[authedUser],
  };
};

export default withRouter(connect(mapStateToProps)(Question));
