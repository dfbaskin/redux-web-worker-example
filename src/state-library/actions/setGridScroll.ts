import { PayloadAction, payloadActionCreator } from "../common";
import { ApplicationState } from "../appState";

interface Payload {
  left: number;
  top: number;
}

export const setGridScrollAction = payloadActionCreator<Payload>(
  "SET_GRID_SCROLL"
);

export function setGridScrollReducer(
  draft: ApplicationState,
  action: PayloadAction<Payload>
): void {
  let { left, top } = action.payload;
  draft.scrollLeft = left;
  draft.scrollTop = top;
}
