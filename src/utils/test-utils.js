import { configureStore } from "@reduxjs/toolkit";
import reducers from "../reducers";
import middleware from "../middleware";
import { users, questions } from "../utils/_DATA";
import Dashboard from "../components/Dashboard";
import Question from "../components/Question";
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

export function createTestAppWithStore(component) {
  return (
    <Provider store={createTestStoreWithInitialData()}>{component}</Provider>
  );
}

export function createTestAppWithStoreAndRouter(initialRoute) {
  return (
    <Provider store={createTestStoreWithInitialData()}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/questions/:id" element={<Question />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
}
