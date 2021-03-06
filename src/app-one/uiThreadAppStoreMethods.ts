import { Action } from "redux";
import { AppStoreMethods } from "../state-library/AppStoreContext";
import { store } from "../state-library/appStore";
import {
  dataViewSelector,
  currentFormulaSelector
} from "../state-library/selectors";

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
