import { AppStoreMethods } from "../state-library/AppStoreContext";
import { store } from "../state-library/appStore";
import {
  allDataSelector,
  dataViewSelector,
  currentFormulaSelector
} from "../state-library/selectors";

export const appStoreMethods: AppStoreMethods = {
  selectors: {
    allDataSelector: () => allDataSelector(store.getState()),
    dataViewSelector: () => dataViewSelector(store.getState()),
    currentFormulaSelector: () => currentFormulaSelector(store.getState())
  },
  dispatch(action: any) {
    store.dispatch(action);
  },
  subscribe<T>(selector: () => T, callback: (data: T) => void) {
    const unsubscribe = store.subscribe(() => {
      callback(selector());
    });
    return { unsubscribe };
  }
};
