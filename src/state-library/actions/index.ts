import { ApplicationState, initialState } from "../appState";
import { createReducer } from "../common";

import { clearDataAction, clearDataReducer } from "./clearData";
import {
  resetDataToSizeAction,
  resetDataAction,
  resetDataReducer
} from "./resetData";
import { setGridSizeAction, setGridSizeReducer } from "./setGridSize";
import { setGridScrollAction, setGridScrollReducer } from "./setGridScroll";
import {
  setGridSelectedColumnAction,
  setGridSelectedColumnReducer
} from "./setGridSelectedColumn";
import {
  addRandomDataColumnAction,
  addRandomDataColumnReducer
} from "./addRandomDataColumn";
import {
  applyFormulaAction,
  applyFormulaResultAction,
  applyFormulaResultReducer
} from "./applyFormula";

const reducer = createReducer<ApplicationState>(
  [
    [clearDataAction, clearDataReducer],
    [resetDataAction, resetDataReducer],
    [setGridSizeAction, setGridSizeReducer],
    [setGridScrollAction, setGridScrollReducer],
    [setGridSelectedColumnAction, setGridSelectedColumnReducer],
    [addRandomDataColumnAction, addRandomDataColumnReducer],
    [applyFormulaResultAction, applyFormulaResultReducer]
  ],
  initialState
);

export {
  clearDataAction,
  resetDataToSizeAction,
  resetDataAction,
  setGridSizeAction,
  setGridScrollAction,
  setGridSelectedColumnAction,
  addRandomDataColumnAction,
  applyFormulaAction,
  applyFormulaResultAction,
  reducer
};
