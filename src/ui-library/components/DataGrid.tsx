import React from "react";
import { GridWorksheetData } from "./GridWorksheetData";
import { GridColumnHeader } from "./GridColumnHeader";

import "./DataGrid.scss";
import { GridRowHeader } from "./GridRowHeader";

interface State {}

export function DataGrid() {
  return (
    <div className="grid">
      <GridWorksheetData />
      <GridColumnHeader />
      <GridRowHeader />
    </div>
  );
}
