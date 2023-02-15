import { connect } from "react-redux";
import QuestionsTabLayout from "./QuestionsTabLayout";

const Dashboard = ({ questionIds, questions, authedUser }) => {
  const answeredQuestionIds = questionIds.filter(
    (questionId) =>
      !questions[questionId].optionOne.votes.includes(authedUser) &&
      !questions[questionId].optionTwo.votes.includes(authedUser)
  );

  const unansweredQuestionIds = questionIds.filter(
    (questionId) =>
      questions[questionId].optionOne.votes.includes(authedUser) ||
      questions[questionId].optionTwo.votes.includes(authedUser)
  );

  return (
    <div className="container dashboard-container">
      <QuestionsTabLayout
        tabs={["Unanswered Questions", "Answered Questions"]}
        questionsPerTab={{
          0: answeredQuestionIds,
          1: unansweredQuestionIds,
        }}
      />
    </div>
  );
};

const mapStateToProps = ({ questions, authedUser }) => {
  return {
    questionIds: Object.keys(questions),
    questions,
    authedUser,
  };
};

export default connect(mapStateToProps)(Dashboard);
