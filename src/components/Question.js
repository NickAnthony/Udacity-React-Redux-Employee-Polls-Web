import { connect } from "react-redux";
import { withRouter } from "../utils/helpers";
import { handleUserVote } from "../actions/shared";
import AnsweredOption from "./AnsweredOption";
import UserAnswer from "./UserAnswer";
import UserAvatarPicture from "./UserAvatarPicture";
import VoteOption from "./VoteOption";

const Question = (props) => {
  const answeredOptionOne = props.question.optionOne.votes.includes(
    props.authedUserDetails.id
  );
  const answeredOptionTwo = props.question.optionTwo.votes.includes(
    props.authedUserDetails.id
  );
  const answeredQuestion = answeredOptionOne || answeredOptionTwo;

  const totalVotes =
    props.question.optionOne.votes.length +
    props.question.optionTwo.votes.length;

  const handleClick = (e) => {
    e.preventDefault();
    props.dispatch(
      handleUserVote(
        props.question.id,
        props.authedUserDetails.id,
        e.target.value
      )
    );
    props.router.navigate(`/poll/${props.question.id}`);
  };

  return (
    <div className="container">
      <h3>Poll by {props.question.author}</h3>
      <UserAvatarPicture avatarURL={props.author.avatarURL} size={120} />
      <h3>Would You Rather...</h3>
      {answeredQuestion && (
        <div className="container-row">
          <AnsweredOption
            optionText={props.question.optionOne.text}
            questionVotes={props.question.optionOne.votes.length}
            totalVotes={totalVotes}
            chosenByAuthedUser={answeredOptionOne}
          />
          <AnsweredOption
            optionText={props.question.optionTwo.text}
            questionVotes={props.question.optionTwo.votes.length}
            totalVotes={totalVotes}
            chosenByAuthedUser={answeredOptionTwo}
          />
        </div>
      )}
      {answeredQuestion && (
        <UserAnswer
          answeredOptionOne={answeredOptionOne}
          answeredOptionTwo={answeredOptionTwo}
          optionOneText={props.question.optionOne.text}
          optionTwoText={props.question.optionTwo.text}
        />
      )}

      {!answeredQuestion && (
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
      )}
    </div>
  );
};

const mapStateToProps = ({ questions, authedUser, users }, props) => {
  const { id } = props.router.params;
  console.log(props);

  return {
    question: questions[id],
    authedUserDetails: users[authedUser],
    author: users[questions[id].author],
  };
};

export default withRouter(connect(mapStateToProps)(Question));
