import { emptyActionCreator, Action } from "../common";
import { ApplicationState } from "../appState";

export const addRandomDataColumnAction = emptyActionCreator(
  "ADD_RANDOM_DATA_COLUMN"
);

export function addRandomDataColumnReducer(
  draft: ApplicationState,
  _: Action
): void {
  let columnIndex = draft.usedColumnCount++;
  const column = draft.columns[columnIndex];
  column.width = 150;
  for (const dataRow of draft.data) {
    if (Math.random() < 0.4) {
      dataRow[columnIndex] = Math.random();
    }
  }
}
