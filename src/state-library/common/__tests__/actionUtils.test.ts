import {
  emptyActionCreator,
  payloadActionCreator,
  payloadOrErrorActionCreator
} from "../actionUtils";

interface TestPayload {
  value: string;
}

describe("action creators", () => {
  it("should create an empty action creator", () => {
    const emptyAction = emptyActionCreator("EMPTY_ACTION");
    expect(emptyAction.toString()).toEqual("EMPTY_ACTION");
    expect(emptyAction()).toEqual({
      type: "EMPTY_ACTION"
    });
  });

  it("should create a payload action creator", () => {
    const payloadAction = payloadActionCreator<TestPayload>("PAYLOAD_ACTION");
    expect(payloadAction.toString()).toEqual("PAYLOAD_ACTION");
    expect(payloadAction({ value: "abc" })).toEqual({
      type: "PAYLOAD_ACTION",
      payload: {
        value: "abc"
      }
    });
  });

  it("should create a payload or error action creator with payload", () => {
    const payloadAction = payloadOrErrorActionCreator<TestPayload>(
      "PAYLOAD_OR_ERROR_ACTION"
    );
    expect(payloadAction.toString()).toEqual("PAYLOAD_OR_ERROR_ACTION");
    expect(payloadAction({ value: "abc" })).toEqual({
      type: "PAYLOAD_OR_ERROR_ACTION",
      payload: {
        value: "abc"
      }
    });
  });

  it("should create a payload or error action creator with error", () => {
    const payloadAction = payloadOrErrorActionCreator<TestPayload>(
      "PAYLOAD_OR_ERROR_ACTION"
    );
    expect(payloadAction.toString()).toEqual("PAYLOAD_OR_ERROR_ACTION");
    expect(payloadAction(new Error("My error"))).toEqual({
      type: "PAYLOAD_OR_ERROR_ACTION",
      payload: new Error("My error"),
      error: true
    });
  });
});
