import { Action } from "./actionUtils";
import { produce, Draft } from "immer";

interface Reducer<T> {
  (draft: Draft<T>, action: Action): void;
}

type Definition = [Function, Function];

export function createReducer<T>(reducers: Definition[], initialState: T) {
  const reducerMap = new Map<string, Reducer<T>>(
    reducers.map(([ac, rd]) => [ac.toString(), rd as Reducer<T>])
  );
  return (state: T | undefined = initialState, action: Action): T => {
    const reducer = reducerMap.get(action.type);
    return reducer
      ? produce(state, draft => {
          reducer(draft, action);
        })
      : state;
  };
}
