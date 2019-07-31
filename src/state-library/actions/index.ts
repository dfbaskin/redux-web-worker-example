import { ApplicationState, initialState } from "../appState";
import { createReducer } from "../common";

import { resetDataAction, resetDataReducer } from "./resetData";

const reducer = createReducer<ApplicationState>(
  [[resetDataAction, resetDataReducer]],
  initialState
);

export { resetDataAction, reducer };
