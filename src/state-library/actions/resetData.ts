import { PayloadAction, payloadActionCreator } from "../common";
import { ApplicationState } from "../appState";
import faker from "faker";

interface Payload {
  rows: number;
  cols: number;
}

const DEFAULT_WIDTH = 80;

const defaultData: [number, (row: number) => any][] = [
  [50, row => row + 1],
  [100, () => faker.name.findName()],
  [DEFAULT_WIDTH, () => faker.random.number({ min: 100, max: 900 })],
  [DEFAULT_WIDTH, () => faker.random.number({ min: 0, max: 1000 })],
  [DEFAULT_WIDTH, () => faker.random.number({ min: 100000, max: 999999 })]
];

export const resetDataAction = payloadActionCreator<Payload>("RESET_DATA");

export function resetDataReducer(
  draft: ApplicationState,
  action: PayloadAction<Payload>
): void {
  let { rows, cols } = action.payload;

  draft.columns = [];
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
