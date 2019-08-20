import { payloadActionCreator } from "../common";
import { ApplicationState } from "../appState";
import { Action } from "redux";
import { applyFormula } from "../math/mathEngine";
import { Observable, of } from "rxjs";
import { ofType, StateObservable } from "redux-observable";
import { switchMap, withLatestFrom } from "rxjs/operators";
import { applyFormulaResultAction } from "./applyFormulaResult";

interface Payload {
  columnIndex: number;
  formula: string;
}

export const applyFormulaAction = payloadActionCreator<Payload>(
  "APPLY_FORMULA"
);

export function applyFormulaEpic(
  actionStream: Observable<Action>,
  stateStream: StateObservable<ApplicationState>
): Observable<Action> {
  return actionStream.pipe(
    ofType(applyFormulaAction),
    withLatestFrom(stateStream),
    switchMap(([action, { data }]) => {
      const { payload } = action as ReturnType<typeof applyFormulaAction>;
      const { formula, columnIndex } = payload;
      const updatedData = applyFormula(formula, data);
      return of(
        applyFormulaResultAction({
          columnIndex,
          formula,
          updatedData
        })
      );
    })
  );
}
