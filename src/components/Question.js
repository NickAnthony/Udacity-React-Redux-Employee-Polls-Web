import { connect } from "react-redux";
import { withRouter } from "../utils/helpers";
import { handleUserVote } from "../actions/shared";
import AnsweredOption from "./AnsweredOption";
import UserAnswer from "./UserAnswer";
import UserAvatarPicture from "./UserAvatarPicture";
import VoteOption from "./VoteOption";
import ErrorPage from "./ErrorPage";

const Question = ({
  dispatch,
  notFound,
  question,
  authedUserDetails,
  author,
  answeredOptionOne,
  answeredOptionTwo,
  answeredQuestion,
  totalVotes,
}) => {
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(handleUserVote(question.id, authedUserDetails.id, e.target.value));
  };

  // Throw a 404 when question does not exist
  if (notFound) {
    return <ErrorPage />;
  }

  return (
    <div className="container">
      <h3>Poll by {question.author}</h3>
      <UserAvatarPicture avatarURL={author.avatarURL} size={120} />
      <h3>Would You Rather...</h3>
      {answeredQuestion && (
        <div className="container-row">
          <AnsweredOption
            optionText={question.optionOne.text}
            questionVotes={question.optionOne.votes.length}
            totalVotes={totalVotes}
            chosenByAuthedUser={answeredOptionOne}
          />
          <AnsweredOption
            optionText={question.optionTwo.text}
            questionVotes={question.optionTwo.votes.length}
            totalVotes={totalVotes}
            chosenByAuthedUser={answeredOptionTwo}
          />
        </div>
      )}
      {answeredQuestion && (
        <UserAnswer
          answeredOptionOne={answeredOptionOne}
          answeredOptionTwo={answeredOptionTwo}
          optionOneText={question.optionOne.text}
          optionTwoText={question.optionTwo.text}
        />
      )}

      {!answeredQuestion && (
        <div className="container-row">
          <VoteOption
            optionText={question.optionOne.text}
            optionNumber={1}
            handleClick={handleClick}
          />
          <VoteOption
            optionText={question.optionTwo.text}
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
  if (questions[id] === undefined) {
    return {
      notFound: true,
      question: null,
      authedUserDetails: null,
      author: null,
      answeredOptionOne: false,
      answeredOptionTwo: false,
      answeredQuestion: false,
      totalVotes: 0,
    };
  }
  const question = questions[id];
  const answeredOptionOne = question.optionOne.votes.includes(authedUser);
  const answeredOptionTwo = question.optionTwo.votes.includes(authedUser);
  const answeredQuestion = answeredOptionOne || answeredOptionTwo;

  const totalVotes =
    question.optionOne.votes.length + question.optionTwo.votes.length;

  return {
    notFound: false,
    question,
    authedUserDetails: users[authedUser],
    author: users[questions[id].author],
    answeredOptionOne,
    answeredOptionTwo,
    answeredQuestion,
    totalVotes,
  };
};

export default withRouter(connect(mapStateToProps)(Question));
