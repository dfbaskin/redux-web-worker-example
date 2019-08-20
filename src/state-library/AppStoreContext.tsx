import React, { createContext } from "react";
import { Selectors } from "./selectors";
import { ApplicationState } from "./appState";
import { Action } from "redux";

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
