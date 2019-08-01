import React from "react";
import { useStateSelector, WithSelector } from "../hooks/useStateSelector";

export function GridWorksheetData() {
  const { viewData } = useStateSelector(WithSelector.dataViewSelector) || {
    viewData: []
  };
  return (
    <div>
      {viewData.map(({ row, col, top, left, width, height, value }) => {
        return (
          <div
            className="cell"
            key={`${row}-${col}`}
            style={{
              top,
              left,
              width,
              height
            }}
          >
            {value}
          </div>
        );
      })}
    </div>
  );
}
