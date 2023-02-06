import { formatTimestamp } from "../utils/helpers";
import { useNavigate } from "react-router";

const QuestionCard = (props) => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/poll/${props.questionId}`);
  };
  return (
    <div className="question-card-container">
      <div className="question-card-name">{props.author}</div>
      <div className="question-card-timestamp">
        {formatTimestamp(props.timestamp)}
      </div>
      <button className="question-card-show-btn" onClick={handleClick}>
        Show
      </button>
    </div>
  );
};

export default QuestionCard;
