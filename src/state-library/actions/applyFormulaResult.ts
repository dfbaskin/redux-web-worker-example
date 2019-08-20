import { PayloadAction, payloadActionCreator } from "../common";
import { ApplicationState } from "../appState";

interface Payload {
  columnIndex: number; // 0-based
  formula: string;
  updatedData: any[];
}

export const applyFormulaResultAction = payloadActionCreator<Payload>(
  "APPLY_FORMULA_RESULT"
);

export function applyFormulaResultReducer(
  draft: ApplicationState,
  action: PayloadAction<Payload>
): void {
  const { columnIndex, formula, updatedData } = action.payload;
  draft.formulas[columnIndex] = formula;
  for (let row = 0; row < draft.data.length; row++) {
    draft.data[row][columnIndex] = updatedData[row];
  }
}
