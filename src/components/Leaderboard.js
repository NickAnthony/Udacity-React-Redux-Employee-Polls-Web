import { connect } from "react-redux";
import UserAvatarPicture from "./UserAvatarPicture";

const Leaderboard = ({ sortedUsers, users }) => {
  return (
    <div className="container">
      <table>
        <tr className="leaderboard-header">
          <th>User</th>
          <th>Answered</th>
          <th>Created</th>
        </tr>
        {sortedUsers.map((sortedUser) => {
          const username = sortedUser[0];
          const user = users[username];
          return (
            <tr key={username}>
              <td className="profile-container">
                <UserAvatarPicture avatarURL={user.avatarURL} size={40} />
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

const mapStateToProps = ({ users }) => {
  // First, we have to calculate each
  const unsortedUsers = Object.keys(users).map((username) => {
    const user = {
      ...users[username],
    };
    user["numAnswers"] = Object.keys(user.answers).length;
    user["numQuestions"] = user.questions.length;
    return [username, user.numAnswers, user.numQuestions];
  });
  // This function sorts usernames by the number of questions they've answered
  // then by the number of questions they asked.
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
  };
};

export default connect(mapStateToProps)(Leaderboard);
