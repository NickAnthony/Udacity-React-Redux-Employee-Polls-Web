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

  it("will not allow submit until both fields are entered.", () => {
    var component = render(
      <Provider store={createTestStore()}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    // Get the submit button
    var submitButton = component.getByTestId("submit-button");
    // Check the button is disabled at the start
    expect(submitButton).toBeDisabled();

    // Add input to the username field
    var usernameInput = component.getByTestId("username-input");
    fireEvent.change(usernameInput, { target: { value: "testusername" } });
    // Check the button is disabled with only username
    expect(submitButton).toBeDisabled();

    // Add input to the password field
    var passwordInput = component.getByTestId("password-input");
    fireEvent.change(passwordInput, {
      target: { value: "invalidpassword" },
    });

    // Check the button is enabled with both username and password
    expect(submitButton).not.toBeDisabled();

    // Reset the password field and check the submit submit button is disabled
    // Check the button is disabled at the start
    fireEvent.change(passwordInput, {
      target: { value: "" },
    });
    expect(submitButton).toBeDisabled();
  });
});
