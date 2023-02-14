import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";
import middleware from "./middleware";

// Convert our state into a string and store it in local storage
function saveStateToLocalStorage({ questions, users, authedUser }) {
  try {
    const serialisedState = JSON.stringify({ questions, users, authedUser });
    localStorage.setItem("persistedState", serialisedState);
  } catch (e) {
    console.group("Saving State to Local Store Warning");
    console.warn(e);
    console.groupEnd();
  }
}

// Load our serialed state from local storage and deserialize it
function loadStateFromLocalStorage() {
  try {
    const serialisedState = localStorage.getItem("persistedState");
    if (serialisedState === null) {
      return undefined;
    }
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    console.group("Loading State to Local Store Warning");
    console.warn(e);
    console.groupEnd();
    return undefined;
  }
}

const store = configureStore({
  reducer: reducers,
  middleware: middleware,
  preloadedState: loadStateFromLocalStorage(),
});

// Subscribe to changes in our store so that we store everything to local storage.
store.subscribe(() => saveStateToLocalStorage(store.getState()));

export default store;
