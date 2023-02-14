import { connect } from "react-redux";
import QuestionsLayout from "./QuestionsLayout";

const Dashboard = ({ questionIds, questions, authedUser }) => {
  const newQuestionIds = questionIds.filter(
    (questionId) =>
      !questions[questionId].optionOne.votes.includes(authedUser) &&
      !questions[questionId].optionTwo.votes.includes(authedUser)
  );

  const doneQuestionIds = questionIds.filter(
    (questionId) =>
      questions[questionId].optionOne.votes.includes(authedUser) ||
      questions[questionId].optionTwo.votes.includes(authedUser)
  );

  return (
    <div className="container">
      <QuestionsLayout title={"New Questions"} questionIds={newQuestionIds} />
      <QuestionsLayout title={"Done"} questionIds={doneQuestionIds} />
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
