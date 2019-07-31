import React from "react";
import ReactDOM from "react-dom";
import { Hello } from "../ui-library/components/Hello";
import "../ui-library/index.scss";
import { Layout } from "../ui-library/components/Layout";

ReactDOM.render(
  <Layout
    renderMenu={() => <Hello name="Menu" />}
    renderHeader={() => <Hello name="Header" />}
    renderTable={() => <Hello name="Table" />}
  />,
  document.getElementById("root")
);
