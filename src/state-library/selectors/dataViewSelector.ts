import { createSelector } from "reselect";
import { stateSelector } from "./stateSelector";

const CELL_HEIGHT = 30;

interface CellDetails {
  value: any;
  top: number;
  left: number;
  row: number;
  col: number;
  width: number;
  height: number;
}

export const dataViewSelector = createSelector(
  stateSelector,
  state => {
    const { columns, data, scrollTop, scrollLeft, height, width } = state;

    const dataHeight = data.length * CELL_HEIGHT;
    const { bounds, dataWidth } = columns.reduce(
      (acc, { width }) => {
        acc.bounds.push({
          width: width + 1,
          left: acc.dataWidth,
          right: acc.dataWidth + width
        });
        acc.dataWidth += width;
        return acc;
      },
      {
        bounds: [] as {
          width: number;
          left: number;
          right: number;
        }[],
        dataWidth: 0
      }
    );

    const rowStart = Math.floor(scrollTop / CELL_HEIGHT);
    const rowCount = Math.ceil(height / CELL_HEIGHT);
    const { colStart, colCount } = bounds.reduce(
      (acc, { left, right }, idx) => {
        if (left <= scrollLeft + width && scrollLeft <= right) {
          if (acc.colStart === -1) {
            acc.colStart = idx;
          }
          acc.colCount += 1;
        }
        return acc;
      },
      {
        colStart: -1,
        colCount: 0
      }
    );

    const viewData: CellDetails[] = [];
    if (colStart !== -1) {
      const rowEnd = Math.min(rowStart + rowCount, data.length);
      for (let rowIdx = rowStart; rowIdx < rowEnd; rowIdx++) {
        const colEnd = Math.min(colStart + colCount, bounds.length);
        for (let colIdx = colStart; colIdx < colEnd; colIdx++) {
          const { left, width } = bounds[colIdx];
          viewData.push({
            value: data[rowIdx][colIdx],
            top: rowIdx * CELL_HEIGHT,
            left,
            row: rowIdx,
            col: colIdx,
            width,
            height: CELL_HEIGHT + 1
          });
        }
      }
    }

    return {
      viewData,
      dataHeight,
      dataWidth
    };
  }
);
