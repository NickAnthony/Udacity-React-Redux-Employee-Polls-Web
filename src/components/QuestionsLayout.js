import { connect } from "react-redux";
import QuestionCard from "./QuestionCard";

const QuestionsLayout = ({ questions, questionIds }) => {
  return (
    <div className="container-row-start question-layout-container negative-top-margin">
      {questionIds.map((questionId) => {
        const question = questions[questionId];
        return (
          <QuestionCard
            key={question.id}
            questionId={questionId}
            author={question.author}
            timestamp={question.timestamp}
          />
        );
      })}
      {questionIds.length === 0 ? (
        <span style={{ color: "#8e8d8a" }}>Empty...</span>
      ) : null}
    </div>
  );
};

const mapStateToProps = ({ questions }, { questionIds }) => {
  const sortedQuestions = []
    .concat(questionIds)
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);
  console.log(sortedQuestions);
  return {
    questions,
    questionIds: sortedQuestions,
  };
};

export default connect(mapStateToProps)(QuestionsLayout);
