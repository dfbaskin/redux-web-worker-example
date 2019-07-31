import { AppStoreMethods } from "../state-library/AppStoreContext";
import { Action } from "../state-library/common";
import { store } from "../state-library/appStore";

export const appStoreMethods: AppStoreMethods = {
  dispatch(action: Action) {
    store.dispatch(action);
    // console.log(JSON.stringify(store.getState(), null, 2));
  }
};
