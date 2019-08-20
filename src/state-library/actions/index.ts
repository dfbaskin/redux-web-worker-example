import { ApplicationState, initialState } from "../appState";
import { createReducer } from "../common";

import { clearDataAction, clearDataReducer } from "./clearData";
import { resetDataAction, resetDataReducer } from "./resetData";
import {
  DataSizes,
  resetExampleDataAction,
  resetExampleDataEpic
} from "./resetExampleData";
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
  applyFormulaResultAction,
  applyFormulaResultReducer
} from "./applyFormulaResult";
import { applyFormulaAction, applyFormulaEpic } from "./applyFormula";
import { combineEpics } from "redux-observable";

const rootReducer = createReducer<ApplicationState>(
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

const rootEpic = combineEpics(resetExampleDataEpic, applyFormulaEpic);

export {
  DataSizes,
  clearDataAction,
  resetDataAction,
  resetExampleDataAction,
  setGridSizeAction,
  setGridScrollAction,
  setGridSelectedColumnAction,
  addRandomDataColumnAction,
  applyFormulaAction,
  applyFormulaResultAction,
  rootReducer,
  rootEpic
};
