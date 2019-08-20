import { resetDataAction, resetDataReducer } from "../resetData";
import { ApplicationState, initialState } from "../../appState";
import { createReducer } from "../../common";

const reducer = createReducer<ApplicationState>(
  [[resetDataAction, resetDataReducer]],
  initialState
);

describe("reset data action", () => {
  it("should create default data", () => {
    const action = resetDataAction({
      rows: 0,
      cols: 0
    });
    const oldState: ApplicationState = initialState;
    const newState = reducer(oldState, action);
    expect(newState).toMatchSnapshot();
  });

  it("should create random data", () => {
    const action = resetDataAction({
      rows: 10,
      cols: 20
    });
    const oldState: ApplicationState = initialState;
    const newState = reducer(oldState, action);
    expect(newState.columns.length).toBe(20);
    expect(newState.data.length).toBe(10);
    for (let col = 0; col < 20; col++) {
      expect(newState.columns[col].id).toEqual(`C${col + 1}`);
    }
    for (let row = 0; row < 10; row++) {
      const dataRow = newState.data[row];
      expect(dataRow[0]).toEqual(row + 1);
    }
  });
});
