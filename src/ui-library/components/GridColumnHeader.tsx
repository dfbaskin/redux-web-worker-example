import React, { useContext } from "react";
import { ColumnHeaderDetails } from "../../state-library/selectors/dataViewSelector";
import { setGridSelectedColumnAction } from "../../state-library/actions";
import { AppStoreContext } from "../../state-library/AppStoreContext";

interface Props {
  headers: ColumnHeaderDetails[];
}

export function GridColumnHeader({ headers }: Props) {
  const { dispatch } = useContext(AppStoreContext);
  return (
    <div>
      {headers.map(({ col, top, left, width, height, isColumnSelected }) => {
        const onClick = () => {
          dispatch(setGridSelectedColumnAction({ columnIndex: col }));
        };
        return (
          <div
            className={isColumnSelected ? "cell selected" : "cell"}
            key={col}
            style={{
              top,
              left,
              width,
              height
            }}
            onClick={onClick}
          >
            {`C${col + 1}`}
          </div>
        );
      })}
    </div>
  );
}
