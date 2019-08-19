import { Action, emptyActionCreator } from "../common";
import { ApplicationState } from "../appState";

export const clearDataAction = emptyActionCreator("CLEAR_DATA");

export function clearDataReducer(
  draft: ApplicationState,
  action: Action
): void {
  draft.columns = [];
  draft.data = [];
  draft.formulas = [];
  draft.usedColumnCount = 0;
  delete draft.selectedColumnIndex;
}
