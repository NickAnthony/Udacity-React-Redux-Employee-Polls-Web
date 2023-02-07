import { connect } from "react-redux";
import { useState } from "react";
import { addQuestion } from "../actions/questions";
import { _saveQuestion } from "../utils/_DATA";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { useNavigate } from "react-router";

const CreatePoll = (props) => {
  const [firstOption, setFirstOption] = useState("");
  const [secondOption, setSecondOption] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.dispatch(showLoading());

    return _saveQuestion({
      optionOneText: firstOption,
      optionTwoText: secondOption,
      author: props.authedUser,
    })
      .then((formattedQuestion) => {
        props.dispatch(addQuestion(formattedQuestion));
        setFirstOption("");
        setSecondOption("");
        navigate("/");
      })
      .catch((e) => {
        console.group("Save Question Error");
        console.log("Saving quesiton hit the following error:");
        console.log(e);
        console.log("The current state is:");
        console.log(props);
        console.groupEnd();
        alert(
          "There was an error when trying to save your question.  Please try again."
        );
      })
      .finally(() => {
        props.dispatch(hideLoading());
      });
  };

  const handleFirstOptionChange = (e) => {
    e.preventDefault();
    setFirstOption(e.target.value);
  };

  const handleSecondOptionChange = (e) => {
    e.preventDefault();
    setSecondOption(e.target.value);
  };

  return (
    <div className="container">
      <h3>Would You Rather</h3>
      <h4>Create Your Own Poll</h4>
      <form className="create-poll-form" onSubmit={handleSubmit}>
        <p>First Option</p>
        <input
          type="text"
          value={firstOption}
          onChange={handleFirstOptionChange}
        />
        <p>Second Option</p>
        <input
          type="text"
          value={secondOption}
          onChange={handleSecondOptionChange}
        />
        <button
          className="btn"
          type="submit"
          disabled={firstOption === "" || secondOption === ""}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => ({ authedUser });

export default connect(mapStateToProps)(CreatePoll);
