import { Action } from "redux";
import { wrapStore } from "redux-in-worker";
import { AppStoreMethods } from "../state-library/AppStoreContext";
import { initialState } from "../state-library/AppState";
import {
  currentFormulaSelector,
  dataViewSelector
} from "../state-library/selectors";

const store = wrapStore(
  new Worker("./store.worker", { type: "module" }),
  initialState
);

export const appStoreMethods: AppStoreMethods = {
  selectors: {
    dataViewSelector: () => dataViewSelector(store.getState()),
    currentFormulaSelector: () => currentFormulaSelector(store.getState())
  },
  dispatch(action: Action) {
    store.dispatch(action);
  },
  subscribe<T>(selector: () => T, callback: (data: T) => void) {
    const unsubscribe = store.subscribe(() => {
      callback(selector());
    });
    return { unsubscribe };
  }
};
