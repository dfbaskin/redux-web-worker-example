import React, { useContext, useRef } from "react";
import { useWindowReisze } from "../hooks/useWindowResize";
import { AppStoreContext } from "../../state-library/AppStoreContext";
import {
  setGridScrollAction,
  setGridSizeAction
} from "../../state-library/actions";
import { CellDetails } from "../../state-library/selectors/dataViewSelector";

interface Props {
  viewData: CellDetails[];
  dataWidth: number;
  dataHeight: number;
}

export function GridWorksheetData({ viewData, dataWidth, dataHeight }: Props) {
  const divRef = useRef<HTMLDivElement>(null);
  const { dispatch } = useContext(AppStoreContext);
  useWindowReisze(() => {
    if (divRef.current) {
      const { width, height } = divRef.current.getBoundingClientRect();
      dispatch(setGridSizeAction({ width, height }));
    }
  }, [divRef]);
  const onScroll = () => {
    if (divRef.current) {
      const { scrollLeft, scrollTop } = divRef.current;
      dispatch(setGridScrollAction({ scrollLeft, scrollTop }));
    }
  };
  return (
    <div ref={divRef} onScroll={onScroll}>
      <div style={{ width: dataWidth, height: dataHeight }}>
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
    </div>
  );
}
