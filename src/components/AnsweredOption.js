/* AnsweredOption is a presentational component that shows
 * a poll option of a poll that has been answered by the authedUser.  */
const AnsweredOption = ({
  optionText,
  questionVotes,
  totalVotes,
  chosenByAuthedUser,
}) => {
  const winning = questionVotes / totalVotes >= 0.5;
  return (
    <div
      className="container-column question-option-container"
      data-testid="answered-option"
    >
      <span className="question-option">{optionText}</span>

      <span
        className={`question-answer-percentage ${
          winning ? "winning-vote" : "losing-vote"
        }`}
      >
        Votes: {Math.round((questionVotes / totalVotes) * 100)}%
      </span>
    </div>
  );
};

export default AnsweredOption;
