import { connect } from "react-redux";

const QuestionsLayout = (props) => {
  console.log(props);
  return (
    <div>
      <h2>{props.title}</h2>
      <ul>
        {props.questionIds.map((questionId) => {
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

const mapStateToProps = ({ questions }, { title, questionIds }) => {
  return {
    questions,
    title,
    questionIds,
  };
};

export default connect(mapStateToProps)(QuestionsLayout);
