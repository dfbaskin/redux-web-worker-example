import { PayloadAction, payloadActionCreator } from "../common";
import { ApplicationState } from "../appState";

interface Payload {
  rows: number;
  cols: number;
}

const DEFAULT_WIDTH = 80;

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const defaultData: [number, (row: number) => any][] = [
  [50, row => row + 1],
  [DEFAULT_WIDTH, () => randomBetween(100, 900)],
  [DEFAULT_WIDTH, () => randomBetween(0, 1000)],
  [100, () => randomBetween(100000, 999999)],
  [150, () => Math.random()]
];

export const resetDataAction = payloadActionCreator<Payload>("RESET_DATA");

export function resetDataReducer(
  draft: ApplicationState,
  action: PayloadAction<Payload>
): void {
  let { rows, cols } = action.payload;

  draft.columns = [];
  draft.usedColumnCount = defaultData.length;
  for (const [width] of defaultData) {
    const idx = draft.columns.length + 1;
    draft.columns.push({
      id: `C${idx}`,
      width
    });
  }
  while (draft.columns.length < cols) {
    const idx = draft.columns.length;
    const id = `C${idx + 1}`;
    const [width] =
      idx < defaultData.length ? defaultData[idx] : [DEFAULT_WIDTH];
    draft.columns.push({ id, width });
  }

  draft.data = [];
  while (draft.data.length < rows) {
    const row = draft.data.length;
    const dataRow: any[] = [];
    for (let idx = 0; idx < cols; idx++) {
      if (idx < defaultData.length) {
        const [_, dataFn] = defaultData[idx];
        dataRow.push(dataFn(row));
      } else {
        dataRow.push(null);
      }
    }
    draft.data.push(dataRow);
  }
}
