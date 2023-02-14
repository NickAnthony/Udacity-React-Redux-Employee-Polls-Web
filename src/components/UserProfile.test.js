import { render, fireEvent } from "@testing-library/react";
import { createTestAppWithStore } from "../utils/test-utils";
import UserProfile from "./UserProfile";

describe("UserProfile", () => {
  it("has all input fields disabled while in display mode.", () => {
    var component = render(createTestAppWithStore(<UserProfile />));

    expect(component.getByTestId("full-name-input")).toBeDisabled();
    expect(component.getByTestId("username-input")).toBeDisabled();
    expect(component.getByTestId("password-input")).toBeDisabled();
    expect(component.getByTestId("profile-photo-input")).toBeDisabled();

    // Verify the right buttons are available
    expect(
      component.queryByTestId("display-mode-cancel-button")
    ).not.toBeInTheDocument();
    expect(component.queryByTestId("submit-button")).not.toBeInTheDocument();
    expect(
      component.getByTestId("display-mode-enable-button")
    ).toBeInTheDocument();
  });

  it("will enable editing when display mode is disabled.", () => {
    var component = render(createTestAppWithStore(<UserProfile />));

    // Enable editing for the User Profile
    var displayModeButton = component.getByTestId("display-mode-enable-button");
    fireEvent.click(displayModeButton);

    // For some reason, toBeEnabled() doesn't work because the disabled
    // property is an empty string.
    expect(component.getByTestId("full-name-input")).toBeEnabled();
    expect(component.getByTestId("username-input")).toBeDisabled();
    expect(component.getByTestId("password-input")).toBeEnabled();
    expect(component.getByTestId("profile-photo-input")).toBeEnabled();

    // Verify the right buttons are available
    expect(
      component.getByTestId("display-mode-cancel-button")
    ).toBeInTheDocument();
    expect(component.getByTestId("submit-button")).toBeInTheDocument();
    expect(
      component.queryByTestId("display-mode-enable-button")
    ).not.toBeInTheDocument();
  });

  it("will save changes when the profile is updated.", () => {
    var component = render(createTestAppWithStore(<UserProfile />));

    // Enable editing for the User Profile
    var displayModeButton = component.getByTestId("display-mode-enable-button");
    fireEvent.click(displayModeButton);

    // Update full name to the username field
    var fullNameInput = component.getByTestId("full-name-input");
    fireEvent.change(fullNameInput, { target: { value: "John Smith" } });
    // Update input to the password field
    var passwordInput = component.getByTestId("password-input");
    fireEvent.change(passwordInput, {
      target: { value: "password" },
    });
    // Update Avatar URL
    var avatarURLInput = component.getByTestId("profile-photo-input");
    fireEvent.change(avatarURLInput, {
      target: { value: "abcdefg" },
    });

    // Save changes
    var displayModeButton = component.getByTestId("submit-button");
    fireEvent.click(displayModeButton);

    // Verify changes were saved
    expect(fullNameInput.value).toEqual("John Smith");
    expect(passwordInput.value).toEqual("password");
    expect(avatarURLInput.value).toEqual("abcdefg");

    // Verify the right buttons are available
    expect(
      component.queryByTestId("display-mode-cancel-button")
    ).not.toBeInTheDocument();
    expect(component.queryByTestId("submit-button")).not.toBeInTheDocument();
    expect(
      component.getByTestId("display-mode-enable-button")
    ).toBeInTheDocument();
  });
});
