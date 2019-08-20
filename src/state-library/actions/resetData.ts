import { PayloadAction, payloadActionCreator } from "../common";
import { ApplicationState } from "../appState";

interface DefaultColumnBase {
  width?: number;
  value?: (row: number) => any;
  formula?: string;
}

interface DefaultColumn extends DefaultColumnBase {
  columnIndex: number;
}

const DEFAULT_WIDTH = 80;

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const baseColumns: DefaultColumnBase[] = [
  {
    width: 50,
    value: row => row + 1
  },
  {
    value: () => randomBetween(100, 900)
  },
  {
    value: () => randomBetween(0, 1000)
  },
  {
    width: 100,
    value: () => randomBetween(100000, 999999)
  },
  {
    width: 150,
    value: () => Math.random()
  },
  {
    width: 100,
    formula: "C1 + C2 + C3"
  },
  {
    width: 150,
    formula: "C3 mile to km"
  },
  {
    width: 80,
    formula: "mean(C2, C3, C4)"
  }
];

export const defaultColumns = baseColumns.map(
  (details, columnIndex): DefaultColumn => ({
    ...details,
    columnIndex
  })
);

interface Payload {
  rows: number;
  cols: number;
}

export const resetDataAction = payloadActionCreator<Payload>("RESET_DATA");

export function resetDataReducer(
  draft: ApplicationState,
  action: PayloadAction<Payload>
): void {
  let { rows, cols } = action.payload;

  draft.columns = [];
  draft.formulas = [];
  draft.usedColumnCount = defaultColumns.length;

  for (const column of defaultColumns) {
    const idx = draft.columns.length + 1;
    draft.columns.push({
      id: `C${idx}`,
      width: column.width || DEFAULT_WIDTH
    });
    draft.formulas.push(column.formula || null);
  }
  while (draft.columns.length < cols) {
    const idx = draft.columns.length + 1;
    draft.columns.push({
      id: `C${idx}`,
      width: DEFAULT_WIDTH
    });
    draft.formulas.push(null);
  }

  draft.data = [];
  while (draft.data.length < rows) {
    const row = draft.data.length;
    const dataRow: any[] = [];
    for (let idx = 0; idx < cols; idx++) {
      if (idx < defaultColumns.length) {
        const { value } = defaultColumns[idx];
        dataRow.push(value ? value(row) : null);
      } else {
        dataRow.push(null);
      }
    }
    draft.data.push(dataRow);
  }
}
