import { PayloadAction, payloadActionCreator } from "../common";
import { ApplicationState } from "../appState";

interface Payload {
  scrollLeft: number;
  scrollTop: number;
}

export const setGridScrollAction = payloadActionCreator<Payload>(
  "SET_GRID_SCROLL"
);

export function setGridScrollReducer(
  draft: ApplicationState,
  action: PayloadAction<Payload>
): void {
  let { scrollLeft, scrollTop } = action.payload;
  draft.scrollLeft = scrollLeft;
  draft.scrollTop = scrollTop;
}
