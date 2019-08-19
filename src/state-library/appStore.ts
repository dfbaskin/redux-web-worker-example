import { ApplicationState } from "./appState";
import { reducer } from "./actions";
import { Action, applyMiddleware, createStore } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";

const store = createStore(
  reducer,
  applyMiddleware(thunk as ThunkMiddleware<ApplicationState, Action>)
);

export { store };
