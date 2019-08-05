import React, { useContext, useEffect, useRef } from "react";
import { useStateSelector, WithSelector } from "../hooks/useStateSelector";
import { dataViewSelector } from "../../state-library/selectors";
import { useWindowReisze } from "../hooks/useWindowResize";
import { AppStoreContext } from "../../state-library/AppStoreContext";
import {
  setGridSizeAction,
  setGridScrollAction
} from "../../state-library/actions";

export function GridWorksheetData() {
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
  const { viewData, dataWidth, dataHeight } =
    useStateSelector(WithSelector.dataViewSelector) ||
    ({
      viewData: [],
      dataWidth: 0,
      dataHeight: 0
    } as ReturnType<typeof dataViewSelector>);
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
