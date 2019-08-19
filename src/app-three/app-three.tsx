import React from "react";
import ReactDOM from "react-dom";
import { Main } from "../ui-library/components/Main";
import { AppStoreContext } from "../state-library/AppStoreContext";
import { appStoreMethods } from "./workerThreadAppStoreMethods";

import "../ui-library/index.scss";

ReactDOM.render(
  <AppStoreContext.Provider value={appStoreMethods}>
    <Main title="redux-in-worker" />
  </AppStoreContext.Provider>,
  document.getElementById("root")
);
