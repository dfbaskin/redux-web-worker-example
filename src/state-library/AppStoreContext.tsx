import React from "react";
import { Action } from "./common";
//import {ApplicationState} from "./appState";

export interface AppStoreMethods {
  dispatch: (action: Action) => void;
}

export const AppStoreContext = React.createContext<AppStoreMethods>({
  dispatch: () => {
    throw new Error("Not implemented.");
  }
});
