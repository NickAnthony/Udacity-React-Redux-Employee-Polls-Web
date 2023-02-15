import { connect } from "react-redux";
import { useState } from "react";
import { handleAddQuestion } from "../actions/shared";
import { _saveQuestion } from "../utils/_DATA";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { useNavigate } from "react-router";

const CreateQuestion = ({ dispatch, authedUser }) => {
  const [firstOption, setFirstOption] = useState("");
  const [secondOption, setSecondOption] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(showLoading());

    return _saveQuestion({
      optionOneText: firstOption,
      optionTwoText: secondOption,
      author: authedUser,
    })
      .then((formattedQuestion) => {
        dispatch(handleAddQuestion(formattedQuestion));
        setFirstOption("");
        setSecondOption("");
        navigate("/");
      })
      .catch((e) => {
        console.group("Save Question Error");
        console.log("Saving quesiton hit the following error:");
        console.log(e);
        console.log("The current state is:");
        console.log({ firstOption, secondOption, authedUser });
        console.groupEnd();
        alert(
          "There was an error when trying to save your question.  Please try again."
        );
      })
      .finally(() => {
        dispatch(hideLoading());
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
    <div className="positive-top-margin">
      <div className="question-layout-title">Create Your Own Poll</div>

      <div className="question-layout-container new-question-container">
        <h2>Would You Rather...</h2>
        <form onSubmit={handleSubmit}>
          <div className="container-row">
            <div className="container-column">
              <p>First Option</p>
              <textarea
                type="text"
                value={firstOption}
                onChange={handleFirstOptionChange}
              />
            </div>
            <div className="container-column">
              <p>Second Option</p>
              <textarea
                type="text"
                value={secondOption}
                onChange={handleSecondOptionChange}
              />
            </div>
          </div>
          <br />
          <div className="container-column">
            <button
              type="submit"
              disabled={firstOption === "" || secondOption === ""}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => ({ authedUser });

export default connect(mapStateToProps)(CreateQuestion);
