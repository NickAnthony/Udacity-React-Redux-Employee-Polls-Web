import { connect } from "react-redux";
import { BsPersonCircle } from "react-icons/bs";
import { withRouter } from "../utils/helpers";
import { handleUserVote } from "../actions/shared";
import VoteOption from "./VoteOption";

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
    props.router.navigate("/");
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
        <VoteOption
          optionText={props.question.optionOne.text}
          optionNumber={1}
          handleClick={handleClick}
        />
        <VoteOption
          optionText={props.question.optionTwo.text}
          optionNumber={2}
          handleClick={handleClick}
        />
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
