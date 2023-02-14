import { configureStore } from "@reduxjs/toolkit";
import reducers from "../reducers";
import middleware from "../middleware";
import { users, questions } from "../utils/_DATA";
import CreateQuestion from "../components/CreateQuestion";
import CreateUser from "../components/CreateUser";
import Dashboard from "../components/Dashboard";
import Leaderboard from "../components/Leaderboard";
import Login from "../components/Login";
import Question from "../components/Question";
import UserProfile from "../components/UserProfile";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";

export function createTestStore(initialState) {
  const store = configureStore({
    reducer: reducers,
    middleware: middleware,
    preloadedState: initialState,
  });
  return store;
}

export function createTestStoreWithInitialData() {
  return createTestStore({
    users,
    questions,
    authedUser: "nickanthony",
  });
}

export function createTestAppWithStore(initialRoute) {
  return (
    <Provider store={createTestStoreWithInitialData()}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route path="/poll/:id" element={<Question />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
}
