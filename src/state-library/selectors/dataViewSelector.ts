import { createSelector } from "reselect";
import { stateSelector } from "./stateSelector";

const ROW_HEADER_WIDTH = 60;
const CELL_HEIGHT = 30;

export interface CellDetails {
  value: any;
  top: number;
  left: number;
  row: number;
  col: number;
  width: number;
  height: number;
  isColumnSelected: boolean;
}

export interface ColumnHeaderDetails {
  top: number;
  left: number;
  col: number;
  width: number;
  height: number;
  isColumnSelected: boolean;
}

export interface RowHeaderDetails {
  top: number;
  left: number;
  row: number;
  width: number;
  height: number;
}

export const dataViewSelector = createSelector(
  stateSelector,
  state => {
    const {
      columns,
      data,
      scrollTop,
      scrollLeft,
      height,
      width,
      selectedColumnIndex
    } = state;

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
    const columnHeaders: ColumnHeaderDetails[] = [];
    const rowHeaders: RowHeaderDetails[] = [];
    if (colStart !== -1) {
      const rowEnd = Math.min(rowStart + rowCount, data.length);
      for (let rowIdx = rowStart; rowIdx < rowEnd; rowIdx++) {
        const top = rowIdx * CELL_HEIGHT;
        const height = CELL_HEIGHT + 1;
        rowHeaders.push({
          top: top - scrollTop,
          left: 0,
          row: rowIdx,
          width: ROW_HEADER_WIDTH,
          height
        });
        const colEnd = Math.min(colStart + colCount, bounds.length);
        if (rowIdx === rowStart) {
          for (let colIdx = colStart; colIdx < colEnd; colIdx++) {
            const { left, width } = bounds[colIdx];
            columnHeaders.push({
              top: 0,
              left: left - scrollLeft,
              col: colIdx,
              width,
              height: CELL_HEIGHT,
              isColumnSelected: colIdx === selectedColumnIndex
            });
          }
        }
        for (let colIdx = colStart; colIdx < colEnd; colIdx++) {
          const { left, width } = bounds[colIdx];
          viewData.push({
            value: data[rowIdx][colIdx],
            top,
            left,
            row: rowIdx,
            col: colIdx,
            width,
            height,
            isColumnSelected: colIdx === selectedColumnIndex
          });
        }
      }
    }

    return {
      viewData,
      columnHeaders,
      rowHeaders,
      dataHeight,
      dataWidth
    };
  }
);
