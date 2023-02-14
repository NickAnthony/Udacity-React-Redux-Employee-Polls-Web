import DefaultAvatar from "../images/DefaultAvatar.png";
import PropTypes from "prop-types";

/* This dynamically sets the avatar based on the presence of a URL. */
const UserAvatarPicture = ({ avatarURL, size }) => {
  return (
    <div
      className="profile-avatar"
      style={{
        backgroundImage: `url(${avatarURL ? avatarURL : DefaultAvatar})`,
        height: `${size ? size : 20}px`,
        width: `${size ? size : 20}px`,
      }}
    />
  );
};

UserAvatarPicture.propTypes = {
  avatarURL: PropTypes.string,
  size: PropTypes.number,
};

export default UserAvatarPicture;
