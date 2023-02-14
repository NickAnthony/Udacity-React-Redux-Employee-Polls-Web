import PropTypes from "prop-types";

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
        data-testid="vote-option-button"
      >
        Vote
      </button>
    </div>
  );
};

VoteOption.propTypes = {
  optionText: PropTypes.string.isRequired,
  optionNumber: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default VoteOption;
