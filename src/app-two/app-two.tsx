import React from "react";
import ReactDOM from "react-dom";
import { Main } from "../ui-library/components/Main";
import { AppStoreContext } from "../state-library/AppStoreContext";
import { initializeWorker } from "./webWorkerAppStoreMethods";

import "../ui-library/index.scss";

const appStoreMethods = initializeWorker();

ReactDOM.render(
  <AppStoreContext.Provider value={appStoreMethods}>
    <Main title="Web Worker" />
  </AppStoreContext.Provider>,
  document.getElementById("root")
);
