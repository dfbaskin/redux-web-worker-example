import React from "react";
// import { GridColumnHeader } from "./GridColumnHeader";
import { GridWorksheetData } from "./GridWorksheetData";

import "./DataGrid.scss";

interface State {}

export function DataGrid() {
  return (
    <div className="grid">
      <GridWorksheetData />
      <div></div>
      <div></div>
    </div>
  );
}
