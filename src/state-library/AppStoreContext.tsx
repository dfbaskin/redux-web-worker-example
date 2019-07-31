import React, { createContext } from "react";
import { Action } from "./common";
import { Selectors } from "./selectors";

export interface AppStoreMethods {
  selectors: Selectors;
  dispatch: (action: Action) => void;
  subscribe<T>(
    selector: () => T,
    callback: (data: T) => void
  ): {
    unsubscribe: () => void;
  };
}

export const AppStoreContext = createContext<AppStoreMethods>({
  selectors: {} as Selectors,
  dispatch: () => {
    throw new Error("Not implemented.");
  },
  subscribe: () => {
    throw new Error("Not implemented.");
  }
});
