import { AppStoreMethods } from "../state-library/AppStoreContext";
import { Action } from "../state-library/common";
import {
  allDataSelector,
  currentFormulaSelector,
  dataViewSelector
} from "../state-library/selectors";
import { initialState } from "../state-library/appState";
import { proxy, wrap } from "comlink";

interface WorkerProxy {
  selectors: any;
  dispatch(action: Action): Promise<void>;
  onUpdate(callback: () => Promise<void>): Promise<void>;
}

export function initializeWorker(): AppStoreMethods {
  const worker = new Worker("./worker.ts");
  const workerProxy: WorkerProxy = wrap(worker);

  let subscriptionIdCounter = 0;
  const subscriptions = new Map<number, () => Promise<void>>();
  const proxyCallback = proxy(onUpdatedCallback);
  workerProxy.onUpdate(proxyCallback);

  return {
    selectors: {
      allDataSelector: () => allDataSelector(initialState),
      dataViewSelector: () => dataViewSelector(initialState),
      currentFormulaSelector: () => currentFormulaSelector(initialState)
    },
    async dispatch(action: Action) {
      await workerProxy.dispatch(action);
    },
    subscribe<T>(selector: () => T, callback: (data: T) => void) {
      const subscriptionId = ++subscriptionIdCounter;
      const name = selector.name;
      subscriptions.set(subscriptionId, async () => {
        // Proxy the call to the selector. If undefined is returned,
        // then the selector value has not changed (and will not
        // need to be serialized/deserialized.
        const selected: T = await workerProxy.selectors[name]();
        if (selected !== undefined) {
          callback(selected);
        }
      });
      return {
        unsubscribe: () => {
          subscriptions.delete(subscriptionId);
        }
      };
    }
  };

  async function onUpdatedCallback() {
    for (const handler of subscriptions.values()) {
      await handler();
    }
  }
}
