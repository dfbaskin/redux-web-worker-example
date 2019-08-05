import React from "react";
import { RowHeaderDetails } from "../../state-library/selectors/dataViewSelector";

interface Props {
  headers: RowHeaderDetails[];
}

export function GridRowHeader({ headers }: Props) {
  return (
    <div>
      {headers.map(({ row, top, left, width, height }) => {
        return (
          <div
            className="cell"
            key={row}
            style={{
              top,
              left,
              width,
              height
            }}
          >
            {`${row + 1}`}
          </div>
        );
      })}
    </div>
  );
}
