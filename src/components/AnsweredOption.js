import PropTypes from "prop-types";

/* AnsweredOption is a presentational component that shows
 * a poll option of a poll that has been answered by the authedUser.  */
const AnsweredOption = ({
  optionText,
  questionVotes,
  totalVotes,
  chosenByAuthedUser,
}) => {
  return (
    <div
      className={`container-column question-option-container ${
        chosenByAuthedUser ? "green-bold-outline" : ""
      }`}
      data-testid="answered-option"
    >
      <span className="question-option">{optionText}</span>

      <span className={"question-answer-percentage"}>
        Voting: {Math.round((questionVotes / totalVotes) * 100)}% (
        {questionVotes} out of {totalVotes})
      </span>
      {chosenByAuthedUser && (
        <span className="green-background">"Your vote"</span>
      )}
    </div>
  );
};

AnsweredOption.propTypes = {
  optionText: PropTypes.string.isRequired,
  questionVotes: PropTypes.number.isRequired,
  totalVotes: PropTypes.number.isRequired,
  chosenByAuthedUser: PropTypes.bool,
};

export default AnsweredOption;
