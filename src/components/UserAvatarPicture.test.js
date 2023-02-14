import { render } from "@testing-library/react";
import UserAvatarPicture from "./UserAvatarPicture";

describe("UserAvatarPicture", () => {
  it("will display the generic avatar icon at a size of 20px.", () => {
    var component = render(<UserAvatarPicture />);
    expect(component).toMatchSnapshot();
  });
  it("will display the provided URL at a size of 20px.", () => {
    var component = render(
      <UserAvatarPicture avatarURL={"https://i.redd.it/w6kaq2edpxha1.png"} />
    );
    expect(component).toMatchSnapshot();
  });
  it("will display the generic avatar icon at a provided size.", () => {
    var component = render(<UserAvatarPicture size={218} />);
    expect(component).toMatchSnapshot();
  });
});
