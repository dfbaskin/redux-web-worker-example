import React from "react";
import ReactDOM from "react-dom";
import { Main } from "../ui-library/components/Main";
import { AppStoreContext } from "../state-library/AppStoreContext";
import { appStoreMethods } from "./uiThreadAppStoreMethods";

import "../ui-library/index.scss";

ReactDOM.render(
  <AppStoreContext.Provider value={appStoreMethods}>
    <Main title="UI Thread" />
  </AppStoreContext.Provider>,
  document.getElementById("root")
);
