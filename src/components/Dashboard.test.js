import { render } from "@testing-library/react";
import { createTestAppWithStoreAndRouter } from "../utils/test-utils";
import Dashboard from "./Dashboard";

describe("Dashboard", () => {
  it("will display the vote counts by clicking either of the vote buttons.", () => {
    var component = render(createTestAppWithStoreAndRouter("/"));
    expect(component).toMatchSnapshot();
  });
});
