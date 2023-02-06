import { connect } from "react-redux";

const Leaderboard = (props) => {
  return (
    <div className="container">
      <table>
        <tr className="leaderboard-header">
          <th>Users</th>
          <th>Answered</th>
          <th>Created</th>
        </tr>
        {props.sortedUsers.map((sortedUser) => {
          const username = sortedUser[0];
          const user = props.users[username];
          return (
            <tr key={username}>
              <td>{user.name}</td>
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
