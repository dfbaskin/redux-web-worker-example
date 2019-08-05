import { ApplicationState, initialState } from "../appState";
import { createReducer } from "../common";

import { resetDataAction, resetDataReducer } from "./resetData";
import { setGridSizeAction, setGridSizeReducer } from "./setGridSize";
import { setGridScrollAction, setGridScrollReducer } from "./setGridScroll";
import {
  addRandomDataColumnAction,
  addRandomDataColumnReducer
} from "./addRandomDataColumn";

const reducer = createReducer<ApplicationState>(
  [
    [resetDataAction, resetDataReducer],
    [setGridSizeAction, setGridSizeReducer],
    [setGridScrollAction, setGridScrollReducer],
    [addRandomDataColumnAction, addRandomDataColumnReducer]
  ],
  initialState
);

export {
  resetDataAction,
  setGridSizeAction,
  setGridScrollAction,
  addRandomDataColumnAction,
  reducer
};
