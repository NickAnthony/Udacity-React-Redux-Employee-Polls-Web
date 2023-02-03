import { connect } from "react-redux";

const Dashboard = (props) => {
  console.log(props);
  return (
    <div>
      <h3>Dashboard</h3>
      <ul>
        {props.questionIds.map((questionId) => {
          console.log(questionId);
          const question = props.questions[questionId];
          return (
            <li key={question.id}>
              <h2>Would you rather...</h2>
              <p>{question.optionOne.text}</p>
              <p>{question.optionTwo.text}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const mapStateToProps = ({ questions }) => {
  return {
    questionIds: Object.keys(questions),
    questions,
  };
};

export default connect(mapStateToProps)(Dashboard);
