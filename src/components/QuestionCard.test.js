import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import QuestionCard from "./QuestionCard";

describe("QuestionCard", () => {
  it("will display the vote counts by clicking either of the vote buttons.", () => {
    var component = render(
      <MemoryRouter>
        <QuestionCard
          questionId={"am8ehyc8byjqgar0jgpub9"}
          author={"sarahedo"}
          timestamp={1488579767190}
        />
      </MemoryRouter>
    );
    expect(component).toMatchSnapshot();
  });
});
