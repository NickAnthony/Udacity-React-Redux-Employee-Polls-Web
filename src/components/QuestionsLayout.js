import { connect } from "react-redux";
import QuestionCard from "./QuestionCard";

const QuestionsLayout = (props) => {
  return (
    <div className="question-layout-container dashboard-question-container">
      <div className="question-layout-title">{props.title}</div>
      <div className="question-layout-box">
        {props.questionIds.map((questionId) => {
          const question = props.questions[questionId];
          return (
            <QuestionCard
              key={question.id}
              questionId={questionId}
              author={question.author}
              timestamp={question.timestamp}
            />
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
