import { connect } from "react-redux";
import { formatTimestamp } from "../utils/_DATA";

const QuestionsLayout = (props) => {
  console.log(props);
  return (
    <div className="question-layout-container">
      <div className="question-layout-title">{props.title}</div>
      <div className="question-layout-box">
        {props.questionIds.map((questionId) => {
          const question = props.questions[questionId];
          return (
            <div key={question.id} className="question-card-container">
              <div className="question-card-name">{question.author}</div>
              <div className="question-card-timestamp">
                {formatTimestamp(question.timestamp)}
              </div>
              <button className="question-card-show-btn">Show</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = ({ questions }, { title, questionIds }) => {
  return {
    questions,
    title,
    questionIds,
  };
};

export default connect(mapStateToProps)(QuestionsLayout);
