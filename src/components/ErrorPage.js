import { FaHeartBroken } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <div className="create-user-profile-container" data-testid="404-error">
      <h1>404</h1>
      <h1>Looks like that question does not exist</h1>
      <h2>
        <i>
          <FaHeartBroken color="#e85a4f" />
        </i>
      </h2>
    </div>
  );
};

export default ErrorPage;
