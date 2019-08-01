import { AppStoreMethods } from "../state-library/AppStoreContext";
import { Action } from "../state-library/common";
import { allDataSelector } from "../state-library/selectors";
import { initialState } from "../state-library/appState";
import { wrap, proxy } from "comlink";

export function initializeWorker(): AppStoreMethods {
  const worker = new Worker("./worker.ts");
  const workerProxy: any = wrap(worker);

  let subscriptionIdCounter = 0;
  const subscriptions = new Map<number, () => Promise<void>>();
  const proxyCallback = proxy(onUpdatedCallback);
  workerProxy.onUpdate(proxyCallback);

  return {
    selectors: {
      allDataSelector: () => allDataSelector(initialState)
    },
    async dispatch(action: Action) {
      await workerProxy.dispatch(action);
    },
    subscribe<T>(selector: () => T, callback: (data: T) => void) {
      const subscriptionId = ++subscriptionIdCounter;
      const name = selector.name;
      subscriptions.set(subscriptionId, async () => {
        const selected = await workerProxy.selectors[name]();
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
