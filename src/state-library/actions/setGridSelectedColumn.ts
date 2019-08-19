import { PayloadAction, payloadActionCreator } from "../common";
import { ApplicationState } from "../appState";

interface Payload {
  columnIndex?: number; // 0-based
}

export const setGridSelectedColumnAction = payloadActionCreator<Payload>(
  "SET_GRID_SELECTED_COLUMN"
);

export function setGridSelectedColumnReducer(
  draft: ApplicationState,
  action: PayloadAction<Payload>
): void {
  const { columnIndex } = action.payload;
  if (columnIndex === undefined) {
    delete draft.selectedColumnIndex;
  } else {
    draft.selectedColumnIndex = columnIndex;
  }
}
