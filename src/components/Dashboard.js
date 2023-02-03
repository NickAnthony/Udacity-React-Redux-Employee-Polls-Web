import { connect } from "react-redux";
import QuestionsLayout from "./QuestionsLayout";

const Dashboard = (props) => {
  const newQuestionIds = props.questionIds.filter(
    (questionId) =>
      !props.questions[questionId].optionOne.votes.includes(props.authedUser) &&
      !props.questions[questionId].optionTwo.votes.includes(props.authedUser)
  );

  const doneQuestionIds = props.questionIds.filter(
    (questionId) =>
      props.questions[questionId].optionOne.votes.includes(props.authedUser) ||
      props.questions[questionId].optionTwo.votes.includes(props.authedUser)
  );

  return (
    <div>
      <h3>Dashboard</h3>
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
