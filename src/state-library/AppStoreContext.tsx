import React, { createContext } from "react";
import { Selectors } from "./selectors";
import { ApplicationState } from "./appState";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";

export interface AppStoreMethods {
  selectors: Selectors;
  dispatch: ThunkDispatch<ApplicationState, undefined, Action<any>>;
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
