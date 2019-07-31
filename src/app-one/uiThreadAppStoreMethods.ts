import { AppStoreMethods } from "../state-library/AppStoreContext";
import { Action } from "../state-library/common";
import { store } from "../state-library/appStore";
import { allDataSelector } from "../state-library/selectors";

export const appStoreMethods: AppStoreMethods = {
  selectors: {
    allDataSelector: () => allDataSelector(store.getState())
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
