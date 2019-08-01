import { ApplicationState, initialState } from "../appState";
import { createReducer } from "../common";

import { resetDataAction, resetDataReducer } from "./resetData";
import { setGridSizeAction, setGridSizeReducer } from "./setGridSize";
import { setGridScrollAction, setGridScrollReducer } from "./setGridScroll";

const reducer = createReducer<ApplicationState>(
  [
    [resetDataAction, resetDataReducer],
    [setGridSizeAction, setGridSizeReducer],
    [setGridScrollAction, setGridScrollReducer]
  ],
  initialState
);

export { resetDataAction, setGridSizeAction, setGridScrollAction, reducer };
