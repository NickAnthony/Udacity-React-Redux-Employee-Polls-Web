import { formatTimestamp } from "../utils/_DATA";

const QuestionCard = (props) => {
  return (
    <div className="question-card-container">
      <div className="question-card-name">{props.author}</div>
      <div className="question-card-timestamp">
        {formatTimestamp(props.timestamp)}
      </div>
      <button className="question-card-show-btn">Show</button>
    </div>
  );
};

export default QuestionCard;
