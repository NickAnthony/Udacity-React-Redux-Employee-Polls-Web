import { connect } from "react-redux";
import DefaultAvatar from "../images/DefaultAvatar.png";

const Leaderboard = (props) => {
  return (
    <div className="container">
      <table>
        <tr className="leaderboard-header">
          <th>User</th>
          <th>Answered</th>
          <th>Created</th>
        </tr>
        {props.sortedUsers.map((sortedUser) => {
          const username = sortedUser[0];
          const user = props.users[username];
          return (
            <tr key={username}>
              <td className="profile-container">
                {/* This dynamically sets the avatar based on the presence of a URL. */}
                <div
                  className="profile-avatar"
                  style={{
                    backgroundImage: `url(${
                      user.avatarURL ? user.avatarURL : DefaultAvatar
                    })`,
                    height: "40px",
                    width: "40px",
                  }}
                />
                <div className="profile-name-container">
                  <span className="profile-name">{user.name}</span>
                  <span className="profile-username">{username}</span>
                </div>
              </td>
              <td>{user.numAnswers}</td>
              <td>{user.numQuestions}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

const mapStateToProps = ({ users, authedUser }) => {
  const unsortedUsers = [];
  Object.keys(users).map((username) => {
    const user = users[username];
    users[username]["numAnswers"] = Object.keys(users[username].answers).length;
    users[username]["numQuestions"] = users[username].questions.length;
    unsortedUsers.push([
      username,
      users[username].numAnswers,
      users[username].numQuestions,
    ]);
  });
  const sortedUsers = unsortedUsers.sort((a, b) => {
    if (a[1] === b[1]) {
      return b[2] - a[2];
    } else {
      return b[1] - a[1];
    }
  });
  return {
    sortedUsers: sortedUsers,
    users,
    authedUser,
  };
};

export default connect(mapStateToProps)(Leaderboard);
