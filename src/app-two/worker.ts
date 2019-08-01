import { Action } from "../state-library/common";
import { store } from "../state-library/appStore";
import { allDataSelector } from "../state-library/selectors";
import { expose } from "comlink";

const workerMethods = {
  selectors: {
    allDataSelector: () => allDataSelector(store.getState())
  },
  dispatch(action: Action) {
    store.dispatch(action);
  },
  onUpdate(callback: () => Promise<void>) {
    store.subscribe(async () => {
      await callback();
    });
  }
};

expose(workerMethods);
