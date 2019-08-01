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
    const { lefts } = columns.reduce(
      (acc, { width }) => {
        acc.lefts.push(acc.totalWidth);
        acc.totalWidth += width;
        return acc;
      },
      {
        lefts: [] as number[],
        totalWidth: 0
      }
    );
    const viewData: CellDetails[] = [];

    const rowCount = 10,
      rowStart = 0,
      colCount = 7,
      colStart = 0;
    const rowEnd = Math.min(rowStart + rowCount, data.length);
    for (let rowIdx = rowStart; rowIdx < rowEnd; rowIdx++) {
      const colEnd = Math.min(colStart + colCount, data[rowIdx].length);
      for (let colIdx = colStart; colIdx < colEnd; colIdx++) {
        viewData.push({
          value: data[rowIdx][colIdx],
          top: rowIdx * CELL_HEIGHT,
          left: lefts[colIdx],
          row: rowIdx,
          col: colIdx,
          width: columns[colIdx].width + 1,
          height: CELL_HEIGHT + 1
        });
      }
    }
    return {
      viewData
    };
  }
);
