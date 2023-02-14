import { configureStore } from "@reduxjs/toolkit";
import reducers from "../reducers";
import middleware from "../middleware";

export function createTestStore() {
  const store = configureStore({
    reducer: reducers,
    middleware: middleware,
  });
  return store;
}
