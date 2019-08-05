import React from "react";
import { ColumnHeaderDetails } from "../../state-library/selectors/dataViewSelector";

interface Props {
  headers: ColumnHeaderDetails[];
}

export function GridColumnHeader({ headers }: Props) {
  return (
    <div>
      {headers.map(({ col, top, left, width, height }) => {
        return (
          <div
            className="cell"
            key={col}
            style={{
              top,
              left,
              width,
              height
            }}
          >
            {`C${col + 1}`}
          </div>
        );
      })}
    </div>
  );
}
