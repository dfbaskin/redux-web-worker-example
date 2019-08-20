import { payloadActionCreator } from "../common";
import { ApplicationState } from "../appState";
import { Action } from "redux";
import { ofType, StateObservable } from "redux-observable";
import { concat, EMPTY, from, merge, Observable, of } from "rxjs";
import { delay, mergeMap, switchMap, take } from "rxjs/operators";
import { clearDataAction } from "./clearData";
import { defaultColumns, resetDataAction } from "./resetData";
import { applyFormulaResultAction } from "./applyFormulaResult";
import { applyFormula } from "../math/mathEngine";
import { setGridSelectedColumnAction } from "./setGridSelectedColumn";

export enum DataSizes {
  Small,
  Medium,
  Large
}

interface DataSizeDetails {
  rows: number;
  cols: number;
}

const dataSizeMap = new Map<DataSizes, DataSizeDetails>([
  [
    DataSizes.Small,
    {
      rows: 50,
      cols: 50
    }
  ],
  [
    DataSizes.Medium,
    {
      rows: 1000,
      cols: 700
    }
  ],
  [
    DataSizes.Large,
    {
      rows: 10000,
      cols: 4000
    }
  ]
]);

interface Payload {
  size: DataSizes;
}

export const resetExampleDataAction = payloadActionCreator<Payload>(
  "RESET_EXAMPLE_DATA"
);

export function resetExampleDataEpic(
  actionStream: Observable<Action>,
  stateStream: StateObservable<ApplicationState>
): Observable<Action> {
  return actionStream.pipe(
    ofType(resetExampleDataAction),
    switchMap(action => {
      const { payload } = action as ReturnType<typeof resetExampleDataAction>;
      const details =
        dataSizeMap.get(payload.size) || dataSizeMap.get(DataSizes.Small);
      const formulas = defaultColumns.filter(({ formula }) => Boolean(formula));

      const clearStream = of(clearDataAction());
      const resetStream = of(resetDataAction(details!)).pipe(delay(100));
      const applyFormulasStream = from(formulas).pipe(
        mergeMap(column => {
          return actionStream.pipe(
            ofType(
              resetDataAction.toString(),
              applyFormulaResultAction.toString()
            ),
            mergeMap(() => stateStream),
            take(1),
            mergeMap(({ data }) => {
              const { columnIndex } = column;
              const formula = column.formula!;
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
        })
      );

      const setSelectedColumnStream =
        formulas.length > 0
          ? of(
              setGridSelectedColumnAction({
                columnIndex: formulas[0].columnIndex
              })
            )
          : EMPTY;

      return concat(
        clearStream,
        merge(resetStream, applyFormulasStream),
        setSelectedColumnStream
      );
    })
  );
}
