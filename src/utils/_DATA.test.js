import { _saveQuestion, _saveQuestionAnswer } from "./_DATA";

describe("_saveQuestion", () => {
  /* An async unit test to verifies that the saved question is returned and all
  expected fields are populated when correctly formatted data is passed to the
  function. */
  it("will save a question properly and return a formatted question.", async () => {
    const question = {
      optionOneText: "own a BMW",
      optionTwoText: "own an Audi",
      author: "nickanthony",
    };
    const formattedQuestion = await _saveQuestion(question);
    expect(formattedQuestion.id).not.toBeNull();
    expect(formattedQuestion.id.length).toBeGreaterThan(0);
    expect(formattedQuestion.timestamp).not.toBeNull();
    // Verify the timestamp is greater than February 14th, 2023
    expect(formattedQuestion.timestamp).toBeGreaterThan(1676376000000);
    expect(formattedQuestion.author).toEqual(question.author);
    expect(formattedQuestion.optionOne.text).toEqual(question.optionOneText);
    expect(formattedQuestion.optionOne.votes.length).toEqual(0);
    expect(formattedQuestion.optionTwo.text).toEqual(question.optionTwoText);
    expect(formattedQuestion.optionTwo.votes.length).toEqual(0);
  });

  /* An async unit test to verify that an error is returned if incorrect data
  is passed to the function. */
  it("will return an error if incorrect data is passed to it.", async () => {
    const questionWithEmptyOptionOneText = {
      optionOneText: "",
      optionTwoText: "own an Audi",
      author: "nickanthony",
    };
    await expect(_saveQuestion(questionWithEmptyOptionOneText)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
    const questionWithMissingOptionTwoText = {
      optionOneText: "own a BMW",
      author: "nickanthony",
    };
    await expect(
      _saveQuestion(questionWithMissingOptionTwoText)
    ).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
    const questionWithMissingAuthor = {
      optionOneText: "own a BMW",
      optionTwoText: "own an Audi",
    };
    await expect(_saveQuestion(questionWithMissingAuthor)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});

describe("_saveQuestionAnswer", () => {
  /* An async unit test to verify that true is returned when correctly formatted
  data is passed to the function. */
  it("will return true when correct formatted data is pased to it.", async () => {
    const questionAnswer = {
      authedUser: "nickanthony",
      qid: "8xf0y6ziyjabvozdd253nd",
      answer: "optionTwo",
    };
    expect(await _saveQuestionAnswer(questionAnswer)).toEqual(true);
  });

  /* An async unit test to verify that an error is returned if incorrect data is
  passed to the function. */
  it("will return an error if incorrect data is passed to it.", async () => {
    const questionAnswerWithEmptyQid = {
      authedUser: "nickanthony",
      qid: "",
      answer: "optionTwo",
    };
    await expect(
      _saveQuestionAnswer(questionAnswerWithEmptyQid)
    ).rejects.toEqual("Please provide authedUser, qid, and answer");
    const questionAnswerWithMissingAuthedUser = {
      qid: "8xf0y6ziyjabvozdd253nd",
      answer: "optionTwo",
    };
    await expect(
      _saveQuestionAnswer(questionAnswerWithMissingAuthedUser)
    ).rejects.toEqual("Please provide authedUser, qid, and answer");
    const questionAnswerWithMissingAnswer = {
      authedUser: "nickanthony",
      qid: "8xf0y6ziyjabvozdd253nd",
    };
    await expect(
      _saveQuestionAnswer(questionAnswerWithMissingAnswer)
    ).rejects.toEqual("Please provide authedUser, qid, and answer");
  });
});
