import { PayloadAction, payloadActionCreator } from "../common";
import { ApplicationState } from "../appState";
import { Dispatch } from "redux";
import { applyFormula } from "../math/mathEngine";

interface Payload {
  columnIndex: number; // 0-based
  formula: string;
  updatedData: any[];
}

export const applyFormulaResultAction = payloadActionCreator<Payload>(
  "APPLY_FORMULA"
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

interface ApplyFormulaPayload {
  columnIndex: number;
  formula: string;
}

export function applyFormulaAction({
  columnIndex,
  formula
}: ApplyFormulaPayload) {
  return (dispatch: Dispatch, getState: () => ApplicationState) => {
    const { data } = getState();
    const updatedData = applyFormula(formula, data);
    dispatch(
      applyFormulaResultAction({
        columnIndex,
        formula,
        updatedData
      })
    );
  };
}
