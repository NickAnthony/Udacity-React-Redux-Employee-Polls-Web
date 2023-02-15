import { render } from "@testing-library/react";
import { createTestAppWithStore } from "../utils/test-utils";
import Leaderboard from "./Leaderboard";

describe("Leaderboard", () => {
  it("will match the snapshot for the Leaderboard.", () => {
    var component = render(createTestAppWithStore(<Leaderboard />));
    expect(component).toMatchSnapshot();
  });

  it("will populate the leaderboard table with numbers.", () => {
    var component = render(createTestAppWithStore(<Leaderboard />));
    // Verify we have 5 rows in the leaderboard
    expect(component.getAllByTestId("user-row").length).toEqual(5);
    const numberAnsweredComponent = component.getAllByTestId(
      "user-number-answered"
    )[0];
    expect(numberAnsweredComponent.textContent).toEqual("4");
    const numberCreatedComponent = component.getAllByTestId(
      "user-number-created"
    )[0];
    expect(numberAnsweredComponent.textContent).toEqual("4");
  });
});
