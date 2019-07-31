import { createReducer } from "../reducerUtils";
import { Action } from "../actionUtils";

interface TestState {
  value: string;
}

function testActionCreator(type: string): () => Action {
  const fn = function(): Action {
    return {
      type
    };
  };
  fn.toString = () => type;
  return fn;
}

function testReducerCreator(
  type: string
): (draft: TestState, action: Action) => void {
  return (draft: TestState, action: Action) => {
    if (action.type === type) {
      draft.value = type;
    }
  };
}

describe("create reducer", () => {
  it("should handle zero reducers", () => {
    const reducer = createReducer<TestState>([]);
    const oldState: TestState = {
      value: "something"
    };
    const newState = reducer(oldState, { type: "CHANGE" });
    expect(newState).toBe(oldState);
  });

  it("should handle many reducers", () => {
    const reducer = createReducer<TestState>([
      [testActionCreator("A"), testReducerCreator("A")],
      [testActionCreator("B"), testReducerCreator("B")],
      [testActionCreator("C"), testReducerCreator("C")]
    ]);
    let state: TestState = {
      value: "n/a"
    };
    state = reducer(state, { type: "A" });
    expect(state).toEqual({ value: "A" });
    state = reducer(state, { type: "C" });
    expect(state).toEqual({ value: "C" });
    state = reducer(state, { type: "B" });
    expect(state).toEqual({ value: "B" });
  });

  it("should not change state reference when unchanged", () => {
    const reducer = createReducer<TestState>([
      [testActionCreator("A"), testReducerCreator("A")],
      [testActionCreator("B"), testReducerCreator("B")]
    ]);
    const oldState: TestState = {
      value: "A"
    };
    const newState = reducer(oldState, { type: "C" });
    expect(newState).toBe(oldState);
  });
});
