import React from "react";
import { GridWorksheetData } from "./GridWorksheetData";
import { GridColumnHeader } from "./GridColumnHeader";
import { GridRowHeader } from "./GridRowHeader";
import { useStateSelector, WithSelector } from "../hooks/useStateSelector";
import { dataViewSelector } from "../../state-library/selectors";

import "./DataGrid.scss";

export function DataGrid() {
  const { viewData, columnHeaders, rowHeaders, dataWidth, dataHeight } =
    useStateSelector(WithSelector.dataViewSelector) ||
    ({
      viewData: [],
      columnHeaders: [],
      rowHeaders: [],
      dataWidth: 0,
      dataHeight: 0
    } as ReturnType<typeof dataViewSelector>);
  return (
    <div className="grid">
      <GridWorksheetData
        viewData={viewData}
        dataWidth={dataWidth}
        dataHeight={dataHeight}
      />
      <GridColumnHeader headers={columnHeaders} />
      <GridRowHeader headers={rowHeaders} />
    </div>
  );
}
