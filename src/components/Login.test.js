import Login from "./Login";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import React from "react";
import { createTestStore } from "../utils/test-utils";
import { MemoryRouter } from "react-router-dom";

describe("Login", () => {
  it("will present an error message the login fails.", () => {
    var component = render(
      <Provider store={createTestStore()}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    // Add input to the username field
    var usernameInput = component.getByTestId("username-input");
    fireEvent.change(usernameInput, { target: { value: "testusername" } });
    // Add input to the password field
    var passwordInput = component.getByTestId("password-input");
    fireEvent.change(passwordInput, {
      target: { value: "invalidpassword" },
    });
    // Submit the form
    var submitButton = component.getByTestId("submit-button");
    fireEvent.click(submitButton);
    // Verify the component outputs
    expect(
      component.queryByTestId("create-profile-help")
    ).not.toBeInTheDocument();
    expect(component.getByTestId("signin-failed-help")).toBeInTheDocument();
  });

  it("will update the UI when you click on the impersonate button.", () => {
    var component = render(
      <Provider store={createTestStore()}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    // Verify we don't have the username select field, but we do have
    // the password field.
    expect(component.queryByTestId("username-select")).not.toBeInTheDocument();
    expect(component.getByTestId("password-input")).toBeInTheDocument();

    // Get the impersonate button
    var impersonateButton = component.getByTestId("impersonate-button");
    fireEvent.click(impersonateButton);

    // Verify we now have the username select buttons and no password field
    expect(component.getByTestId("username-select")).toBeInTheDocument();
    expect(component.queryByTestId("password-input")).not.toBeInTheDocument();
  });
});
