/* VoteOption is a presentational component that shows
 * a vote option for an unanswered question. */
const VoteOption = ({ optionText, optionNumber, handleClick }) => {
  return (
    <div className="container-column question-option-container">
      <span className="question-option">{optionText}</span>
      <button
        className="question-answer-btn"
        value={optionNumber}
        onClick={handleClick}
      >
        Vote
      </button>
    </div>
  );
};

export default VoteOption;
