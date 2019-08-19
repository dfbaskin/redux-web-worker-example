import { Action } from "../state-library/common";
import { store } from "../state-library/appStore";
import {
  allDataSelector,
  dataViewSelector,
  currentFormulaSelector
} from "../state-library/selectors";
import { expose } from "comlink";
import { ApplicationState } from "../state-library/appState";

const workerMethods = {
  selectors: {
    allDataSelector: selectState(allDataSelector),
    dataViewSelector: selectState(dataViewSelector),
    currentFormulaSelector: selectState(currentFormulaSelector)
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

// Only return selected state if it has actually changed (so it doesn't
// go through serialization/deserializaton process).
function selectState<T>(selector: (state: ApplicationState) => T) {
  let lastValue: T | undefined = undefined;
  return () => {
    const currentValue = selector(store.getState());
    if (lastValue === currentValue) {
      return undefined;
    }

    lastValue = currentValue;
    return currentValue;
  };
}
