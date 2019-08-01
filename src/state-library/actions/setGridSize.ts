import { PayloadAction, payloadActionCreator } from "../common";
import { ApplicationState } from "../appState";

interface Payload {
  width: number;
  height: number;
}

export const setGridSizeAction = payloadActionCreator<Payload>("SET_GRID_SIZE");

export function setGridSizeReducer(
  draft: ApplicationState,
  action: PayloadAction<Payload>
): void {
  let { width, height } = action.payload;
  draft.width = width;
  draft.height = height;
}
