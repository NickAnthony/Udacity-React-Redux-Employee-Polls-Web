/* UserAnswer is a presentational component that shows
 * the poll answer provided by the user.  */
const UserAnswer = ({
  answeredOptionOne,
  answeredOptionTwo,
  optionOneText,
  optionTwoText,
}) => {
  return (
    <div className="user-answer" data-testid="user-answer">
      {"You voted for... "}
      {(answeredOptionOne && optionOneText) ||
        (answeredOptionTwo && optionTwoText)}
    </div>
  );
};

export default UserAnswer;
